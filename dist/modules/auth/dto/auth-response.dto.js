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
exports.AuthResponseDto = exports.UserDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class UserDto {
    id;
    username;
    first_name;
    last_name;
    email;
    roleId;
    gender;
    teacherId;
    classIds;
    classNames;
    gradeLevels;
    roleEn;
    roleKh;
}
exports.UserDto = UserDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1 }),
    __metadata("design:type", Number)
], UserDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'john_doe' }),
    __metadata("design:type", String)
], UserDto.prototype, "username", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'John' }),
    __metadata("design:type", String)
], UserDto.prototype, "first_name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Doe' }),
    __metadata("design:type", String)
], UserDto.prototype, "last_name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'john.doe@example.com' }),
    __metadata("design:type", String)
], UserDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1 }),
    __metadata("design:type", Number)
], UserDto.prototype, "roleId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'MALE' }),
    __metadata("design:type", String)
], UserDto.prototype, "gender", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 1,
        required: false,
        description: 'Teacher ID if user is a teacher',
    }),
    __metadata("design:type", Number)
], UserDto.prototype, "teacherId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: [1, 2],
        required: false,
        description: 'Class IDs associated with user',
    }),
    __metadata("design:type", Array)
], UserDto.prototype, "classIds", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: ['Grade 1A', 'Grade 2B'],
        required: false,
        description: 'Class names associated with user',
    }),
    __metadata("design:type", Array)
], UserDto.prototype, "classNames", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: ['1', '2'],
        required: false,
        description: 'Grade levels associated with user classes',
    }),
    __metadata("design:type", Array)
], UserDto.prototype, "gradeLevels", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'ADMIN' }),
    __metadata("design:type", String)
], UserDto.prototype, "roleEn", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'អ្នកគ្រប់គ្រង' }),
    __metadata("design:type", String)
], UserDto.prototype, "roleKh", void 0);
class AuthResponseDto {
    accessToken;
    user;
}
exports.AuthResponseDto = AuthResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' }),
    __metadata("design:type", String)
], AuthResponseDto.prototype, "accessToken", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: UserDto }),
    __metadata("design:type", UserDto)
], AuthResponseDto.prototype, "user", void 0);
//# sourceMappingURL=auth-response.dto.js.map