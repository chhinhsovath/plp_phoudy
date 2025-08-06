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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExampleController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("./guards/jwt-auth.guard");
const website_permissions_guard_1 = require("./guards/website-permissions.guard");
const roles_website_guard_1 = require("./guards/roles-website.guard");
const roles_guard_1 = require("./guards/roles.guard");
const roles_decorator_1 = require("./decorators/roles.decorator");
const website_permissions_decorator_1 = require("./decorators/website-permissions.decorator");
let ExampleController = class ExampleController {
    getAdminPanel() {
        return { message: 'Admin panel accessed' };
    }
    getDashboard() {
        return { message: 'Dashboard accessed' };
    }
    getTeacherResources() {
        return { message: 'Teacher resources accessed' };
    }
    getAdminOnly() {
        return { message: 'Admin only content' };
    }
    getFlexibleAccess() {
        return { message: 'Flexible access granted' };
    }
    getComplexPermissions() {
        return { message: 'Complex permissions validated' };
    }
};
exports.ExampleController = ExampleController;
__decorate([
    (0, common_1.Get)('admin-panel'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, website_permissions_guard_1.WebsitePermissionsGuard),
    (0, website_permissions_decorator_1.RequireWebsiteId)(1),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ExampleController.prototype, "getAdminPanel", null);
__decorate([
    (0, common_1.Get)('dashboard'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, website_permissions_guard_1.WebsitePermissionsGuard),
    (0, website_permissions_decorator_1.RequireWebsiteDomain)('admin.example.com'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ExampleController.prototype, "getDashboard", null);
__decorate([
    (0, common_1.Get)('teacher-resources'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_website_guard_1.RolesWebsiteGuard),
    (0, roles_decorator_1.Roles)('TEACHER', 'ADMIN'),
    (0, website_permissions_decorator_1.RequireWebsiteId)(2),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ExampleController.prototype, "getTeacherResources", null);
__decorate([
    (0, common_1.Get)('admin-only'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('ADMIN'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ExampleController.prototype, "getAdminOnly", null);
__decorate([
    (0, common_1.Get)('flexible-access'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, website_permissions_guard_1.WebsitePermissionsGuard),
    (0, website_permissions_decorator_1.RequireWebsiteAccess)('portal.example.com'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ExampleController.prototype, "getFlexibleAccess", null);
__decorate([
    (0, common_1.Get)('complex-permissions'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_website_guard_1.RolesWebsiteGuard),
    (0, roles_decorator_1.Roles)('TEACHER', 'ADMIN', 'OFFICER'),
    (0, website_permissions_decorator_1.RequireWebsiteDomain)('school.example.com'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ExampleController.prototype, "getComplexPermissions", null);
exports.ExampleController = ExampleController = __decorate([
    (0, common_1.Controller)('example')
], ExampleController);
//# sourceMappingURL=website-permissions-usage.example.js.map