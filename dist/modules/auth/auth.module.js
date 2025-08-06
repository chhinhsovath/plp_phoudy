"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const passport_1 = require("@nestjs/passport");
const typeorm_1 = require("@nestjs/typeorm");
const config_1 = require("@nestjs/config");
const user_entity_1 = require("../../entities/user.entity");
const teacher_entity_1 = require("../../entities/teacher.entity");
const student_entity_1 = require("../../entities/student.entity");
const class_entity_1 = require("../../entities/class.entity");
const website_entity_1 = require("../../entities/website.entity");
const website_role_permission_entity_1 = require("../../entities/website-role-permission.entity");
const auth_controller_1 = require("./auth.controller");
const auth_service_1 = require("./auth.service");
const jwt_strategy_1 = require("./strategies/jwt.strategy");
const roles_guard_1 = require("./guards/roles.guard");
const website_permissions_guard_1 = require("./guards/website-permissions.guard");
const roles_website_guard_1 = require("./guards/roles-website.guard");
let AuthModule = class AuthModule {
};
exports.AuthModule = AuthModule;
exports.AuthModule = AuthModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                user_entity_1.User,
                teacher_entity_1.Teacher,
                student_entity_1.Student,
                class_entity_1.Class,
                website_entity_1.Website,
                website_role_permission_entity_1.WebsiteRolePermission,
            ]),
            passport_1.PassportModule.register({ defaultStrategy: 'jwt' }),
            jwt_1.JwtModule.registerAsync({
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService],
                useFactory: (configService) => ({
                    secret: '404E635266556A586E3272357538782F413F4428472B4B6250645367566B5970',
                    signOptions: {
                        expiresIn: '1y',
                    },
                }),
            }),
        ],
        controllers: [auth_controller_1.AuthController],
        providers: [
            auth_service_1.AuthService,
            jwt_strategy_1.JwtStrategy,
            roles_guard_1.RolesGuard,
            website_permissions_guard_1.WebsitePermissionsGuard,
            roles_website_guard_1.RolesWebsiteGuard,
        ],
        exports: [
            auth_service_1.AuthService,
            jwt_strategy_1.JwtStrategy,
            passport_1.PassportModule,
            roles_guard_1.RolesGuard,
            website_permissions_guard_1.WebsitePermissionsGuard,
            roles_website_guard_1.RolesWebsiteGuard,
        ],
    })
], AuthModule);
//# sourceMappingURL=auth.module.js.map