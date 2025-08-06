import { Strategy } from 'passport-jwt';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { User } from '../../../entities/user.entity';
declare const JwtStrategy_base: new (...args: [opt: import("passport-jwt").StrategyOptionsWithRequest] | [opt: import("passport-jwt").StrategyOptionsWithoutRequest]) => Strategy & {
    validate(...args: any[]): unknown;
};
export declare class JwtStrategy extends JwtStrategy_base {
    private userRepository;
    private configService;
    private readonly logger;
    constructor(userRepository: Repository<User>, configService: ConfigService);
    validate(payload: any): Promise<any>;
}
export {};
