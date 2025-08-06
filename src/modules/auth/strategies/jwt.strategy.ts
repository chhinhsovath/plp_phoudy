import { Injectable, UnauthorizedException, Logger } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { User } from '../../../entities/user.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  private readonly logger = new Logger(JwtStrategy.name);

  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey:
        '404E635266556A586E3272357538782F413F4428472B4B6250645367566B5970', // Hardcoded secret for now
    });
  }

  async validate(payload: any) {
    this.logger.debug(`Validating JWT payload: ${JSON.stringify(payload)}`);

    let user;

    // Try to find user by email (sub field)
    if (payload.sub) {
      this.logger.debug(`Looking up user by email: ${payload.sub}`);
      user = await this.userRepository.findOne({
        where: { email: payload.sub },
        relations: ['role'],
      });
    }

    // If not found and we have an id, try by id
    if (!user && payload.id) {
      this.logger.debug(`Looking up user by id: ${payload.id}`);
      user = await this.userRepository.findOne({
        where: { id: payload.id },
        relations: ['role'],
      });
    }

    if (!user) {
      this.logger.warn(
        `User not found for JWT payload: ${JSON.stringify(payload)}`,
      );
      throw new UnauthorizedException('Invalid token: User not found');
    }

    if (!user.is_active) {
      this.logger.warn(
        `Inactive user attempted to authenticate: ${user.email}`,
      );
      throw new UnauthorizedException('User is inactive');
    }

    this.logger.debug(`User authenticated: ${user.email} (${user.role})`);

    return user;
  }
}
