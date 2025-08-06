"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var JwtStrategy_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtStrategy = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const typeorm_1 = require("@nestjs/typeorm");
const passport_jwt_1 = require("passport-jwt");
const typeorm_2 = require("typeorm");
const config_1 = require("@nestjs/config");
const user_entity_1 = require("../../../entities/user.entity");
let JwtStrategy = JwtStrategy_1 = class JwtStrategy extends (0, passport_1.PassportStrategy)(passport_jwt_1.Strategy) {
    userRepository;
    configService;
    logger = new common_1.Logger(JwtStrategy_1.name);
    constructor(userRepository, configService) {
        super({
            jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: '404E635266556A586E3272357538782F413F4428472B4B6250645367566B5970',
        });
        this.userRepository = userRepository;
        this.configService = configService;
    }
    async validate(payload) {
        this.logger.debug(`Validating JWT payload: ${JSON.stringify(payload)}`);
        let user;
        if (payload.sub) {
            this.logger.debug(`Looking up user by email: ${payload.sub}`);
            user = await this.userRepository.findOne({
                where: { email: payload.sub },
                relations: ['role'],
            });
        }
        if (!user && payload.id) {
            this.logger.debug(`Looking up user by id: ${payload.id}`);
            user = await this.userRepository.findOne({
                where: { id: payload.id },
                relations: ['role'],
            });
        }
        if (!user) {
            this.logger.warn(`User not found for JWT payload: ${JSON.stringify(payload)}`);
            throw new common_1.UnauthorizedException('Invalid token: User not found');
        }
        if (!user.is_active) {
            this.logger.warn(`Inactive user attempted to authenticate: ${user.email}`);
            throw new common_1.UnauthorizedException('User is inactive');
        }
        this.logger.debug(`User authenticated: ${user.email} (${user.role})`);
        return user;
    }
};
exports.JwtStrategy = JwtStrategy;
exports.JwtStrategy = JwtStrategy = JwtStrategy_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        config_1.ConfigService])
], JwtStrategy);
//# sourceMappingURL=jwt.strategy.js.map