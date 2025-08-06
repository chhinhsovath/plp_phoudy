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
var RolesWebsiteGuard_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.RolesWebsiteGuard = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const auth_service_1 = require("../auth.service");
let RolesWebsiteGuard = RolesWebsiteGuard_1 = class RolesWebsiteGuard {
    reflector;
    authService;
    logger = new common_1.Logger(RolesWebsiteGuard_1.name);
    constructor(reflector, authService) {
        this.reflector = reflector;
        this.authService = authService;
    }
    async canActivate(context) {
        const requiredRoles = this.reflector.getAllAndOverride('roles', [
            context.getHandler(),
            context.getClass(),
        ]);
        const websiteId = this.reflector.getAllAndOverride('websiteId', [
            context.getHandler(),
            context.getClass(),
        ]);
        const websiteDomain = this.reflector.getAllAndOverride('websiteDomain', [context.getHandler(), context.getClass()]);
        const request = context.switchToHttp().getRequest();
        const { user } = request;
        if (!user) {
            this.logger.error('User object not found in request');
            throw new common_1.UnauthorizedException('User not authenticated');
        }
        if (requiredRoles && requiredRoles.length > 0) {
            const hasRole = requiredRoles.some((role) => user.role?.nameEn === role ||
                user.roleId === role ||
                user.role === role);
            if (!hasRole) {
                this.logger.warn(`User ${user.email} with role ${user.role} attempted to access resource requiring roles: ${requiredRoles.join(', ')}`);
                throw new common_1.ForbiddenException('Insufficient role permissions');
            }
        }
        if (websiteId || websiteDomain) {
            const userId = user.id;
            try {
                let hasWebsitePermission = false;
                if (websiteId) {
                    hasWebsitePermission = await this.authService.hasWebsitePermission(userId, websiteId);
                }
                else if (websiteDomain) {
                    hasWebsitePermission =
                        await this.authService.hasWebsitePermissionByDomain(userId, websiteDomain);
                }
                if (!hasWebsitePermission) {
                    this.logger.warn(`User ${user.email} attempted to access website ${websiteId || websiteDomain} without permission`);
                    throw new common_1.ForbiddenException('Access denied to this website');
                }
            }
            catch (error) {
                this.logger.error('Error checking website permissions:', error);
                throw new common_1.ForbiddenException('Unable to verify website permissions');
            }
        }
        return true;
    }
};
exports.RolesWebsiteGuard = RolesWebsiteGuard;
exports.RolesWebsiteGuard = RolesWebsiteGuard = RolesWebsiteGuard_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [core_1.Reflector,
        auth_service_1.AuthService])
], RolesWebsiteGuard);
//# sourceMappingURL=roles-website.guard.js.map