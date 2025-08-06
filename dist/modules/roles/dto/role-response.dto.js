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
exports.RoleResponseDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class RoleResponseDto {
    id;
    nameEn;
    nameKh;
    description;
    createdAt;
    updatedAt;
    userCount;
}
exports.RoleResponseDto = RoleResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1, description: 'Role ID' }),
    __metadata("design:type", Number)
], RoleResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'ADMIN', description: 'Role name in English' }),
    __metadata("design:type", String)
], RoleResponseDto.prototype, "nameEn", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'អ្នកគ្រប់គ្រង', description: 'Role name in Khmer' }),
    __metadata("design:type", String)
], RoleResponseDto.prototype, "nameKh", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Administrator with full system access',
        description: 'Role description',
        required: false,
    }),
    __metadata("design:type", String)
], RoleResponseDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '2024-12-12T10:00:00.000Z',
        description: 'Creation timestamp',
    }),
    __metadata("design:type", Date)
], RoleResponseDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '2024-12-12T10:00:00.000Z',
        description: 'Last update timestamp',
    }),
    __metadata("design:type", Date)
], RoleResponseDto.prototype, "updatedAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 15,
        description: 'Number of users with this role',
        required: false,
    }),
    __metadata("design:type", Number)
], RoleResponseDto.prototype, "userCount", void 0);
//# sourceMappingURL=role-response.dto.js.map