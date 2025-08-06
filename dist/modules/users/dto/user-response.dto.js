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
exports.UserResponseDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const user_entity_1 = require("../../../entities/user.entity");
class UserResponseDto {
    id;
    username;
    first_name;
    last_name;
    email;
    roleId;
    roleNameEn;
    roleNameKh;
    date_of_birth;
    gender;
    is_active;
    phone;
    nationality;
    profile_picture;
    created_at;
    updated_at;
    residence;
    placeOfBirth;
    teacher;
}
exports.UserResponseDto = UserResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1, description: 'User ID' }),
    __metadata("design:type", Number)
], UserResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'john_doe', description: 'Username' }),
    __metadata("design:type", String)
], UserResponseDto.prototype, "username", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'John', description: 'First name' }),
    __metadata("design:type", String)
], UserResponseDto.prototype, "first_name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Doe', description: 'Last name' }),
    __metadata("design:type", String)
], UserResponseDto.prototype, "last_name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'john@example.com', description: 'Email address' }),
    __metadata("design:type", String)
], UserResponseDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1, description: 'Role ID' }),
    __metadata("design:type", Number)
], UserResponseDto.prototype, "roleId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'STUDENT', description: 'Role name in English' }),
    __metadata("design:type", String)
], UserResponseDto.prototype, "roleNameEn", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'សិស្ស', description: 'Role name in Khmer' }),
    __metadata("design:type", String)
], UserResponseDto.prototype, "roleNameKh", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '1995-01-15', description: 'Date of birth' }),
    __metadata("design:type", Date)
], UserResponseDto.prototype, "date_of_birth", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'MALE', enum: user_entity_1.Gender, description: 'Gender' }),
    __metadata("design:type", String)
], UserResponseDto.prototype, "gender", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: true, description: 'Account active status' }),
    __metadata("design:type", Boolean)
], UserResponseDto.prototype, "is_active", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '+855123456789',
        description: 'Phone number',
        required: false,
    }),
    __metadata("design:type", String)
], UserResponseDto.prototype, "phone", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Cambodian',
        description: 'Nationality',
        required: false,
    }),
    __metadata("design:type", String)
], UserResponseDto.prototype, "nationality", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'profile.jpg',
        description: 'Profile picture filename',
        required: false,
    }),
    __metadata("design:type", String)
], UserResponseDto.prototype, "profile_picture", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '2024-12-12T10:00:00.000Z',
        description: 'Creation timestamp',
    }),
    __metadata("design:type", Date)
], UserResponseDto.prototype, "created_at", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '2024-12-12T10:00:00.000Z',
        description: 'Last update timestamp',
    }),
    __metadata("design:type", Date)
], UserResponseDto.prototype, "updated_at", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'User residence information', required: false }),
    __metadata("design:type", Object)
], UserResponseDto.prototype, "residence", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'User place of birth information',
        required: false,
    }),
    __metadata("design:type", Object)
], UserResponseDto.prototype, "placeOfBirth", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Teacher information if user is a teacher',
        required: false,
    }),
    __metadata("design:type", Object)
], UserResponseDto.prototype, "teacher", void 0);
//# sourceMappingURL=user-response.dto.js.map