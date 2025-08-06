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
exports.CreateSchoolDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const status_enum_1 = require("../../../entities/enums/status.enum");
const school_place_dto_1 = require("./school-place.dto");
class CreateSchoolDto {
    name;
    code;
    place;
    profile;
    status;
}
exports.CreateSchoolDto = CreateSchoolDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'School Name' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateSchoolDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'SCH001' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateSchoolDto.prototype, "code", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: school_place_dto_1.SchoolPlaceDto,
        description: 'School location information',
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => school_place_dto_1.SchoolPlaceDto),
    __metadata("design:type", school_place_dto_1.SchoolPlaceDto)
], CreateSchoolDto.prototype, "place", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'school-profile.jpg', description: 'Profile image' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateSchoolDto.prototype, "profile", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: status_enum_1.Status, example: status_enum_1.Status.ACTIVE }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(status_enum_1.Status),
    __metadata("design:type", String)
], CreateSchoolDto.prototype, "status", void 0);
//# sourceMappingURL=create-school.dto.js.map