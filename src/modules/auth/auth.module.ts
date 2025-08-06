import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { User } from '../../entities/user.entity';
import { Teacher } from '../../entities/teacher.entity';
import { Student } from '../../entities/student.entity';
import { Class } from '../../entities/class.entity';
import { Website } from '../../entities/website.entity';
import { WebsiteRolePermission } from '../../entities/website-role-permission.entity';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { RolesGuard } from './guards/roles.guard';
import { WebsitePermissionsGuard } from './guards/website-permissions.guard';
import { RolesWebsiteGuard } from './guards/roles-website.guard';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      Teacher,
      Student,
      Class,
      Website,
      WebsiteRolePermission,
    ]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      useFactory: (configService: ConfigService) => ({
        secret:
          '404E635266556A586E3272357538782F413F4428472B4B6250645367566B5970', // Hardcoded secret for now
        signOptions: {
          expiresIn: '1y',
        },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtStrategy,
    RolesGuard,
    WebsitePermissionsGuard,
    RolesWebsiteGuard,
  ],
  exports: [
    AuthService,
    JwtStrategy,
    PassportModule,
    RolesGuard,
    WebsitePermissionsGuard,
    RolesWebsiteGuard,
  ],
})
export class AuthModule {}
