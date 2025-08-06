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
exports.CreateUserDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const user_entity_1 = require("../../../entities/user.entity");
const user_residence_dto_1 = require("./user-residence.dto");
const user_pob_dto_1 = require("./user-pob.dto");
class CreateUserDto {
    username;
    first_name;
    last_name;
    email;
    password;
    roleId;
    date_of_birth;
    gender;
    phone;
    profile_picture;
    nationality;
    residence;
    placeOfBirth;
}
exports.CreateUserDto = CreateUserDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'john_doe' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateUserDto.prototype, "username", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'John' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateUserDto.prototype, "first_name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Doe' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateUserDto.prototype, "last_name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'john.doe@example.com' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], CreateUserDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'password123' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(8),
    __metadata("design:type", String)
], CreateUserDto.prototype, "password", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1 }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateUserDto.prototype, "roleId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '1990-01-01' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Date)
], CreateUserDto.prototype, "date_of_birth", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: user_entity_1.Gender, example: user_entity_1.Gender.MALE }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsEnum)(user_entity_1.Gender),
    __metadata("design:type", String)
], CreateUserDto.prototype, "gender", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '0123456789', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateUserDto.prototype, "phone", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'https://example.com/profile.jpg', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateUserDto.prototype, "profile_picture", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Cambodian', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateUserDto.prototype, "nationality", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: {
            provinceId: 1,
            districtId: 1,
            communeId: 1,
            villageId: 1,
            fullAddress: '123 Main Street, Phnom Penh, Cambodia',
        },
        required: false,
        description: 'Current residence information',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsObject)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => user_residence_dto_1.UserResidenceDto),
    __metadata("design:type", user_residence_dto_1.UserResidenceDto)
], CreateUserDto.prototype, "residence", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: {
            provinceId: 2,
            districtId: 2,
            communeId: 2,
            villageId: 2,
        },
        required: false,
        description: 'Place of birth information',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsObject)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => user_pob_dto_1.UserPobDto),
    __metadata("design:type", user_pob_dto_1.UserPobDto)
], CreateUserDto.prototype, "placeOfBirth", void 0);
//# sourceMappingURL=create-user.dto.js.map