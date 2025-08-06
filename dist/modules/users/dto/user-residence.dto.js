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
exports.UserResidenceDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class UserResidenceDto {
    provinceId;
    districtId;
    communeId;
    villageId;
    fullAddress;
}
exports.UserResidenceDto = UserResidenceDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1, required: false, description: 'Province ID' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], UserResidenceDto.prototype, "provinceId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1, required: false, description: 'District ID' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], UserResidenceDto.prototype, "districtId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1, required: false, description: 'Commune ID' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], UserResidenceDto.prototype, "communeId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1, required: false, description: 'Village ID' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], UserResidenceDto.prototype, "villageId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '123 Main Street, Phnom Penh, Cambodia',
        required: false,
        description: 'Full address text',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UserResidenceDto.prototype, "fullAddress", void 0);
//# sourceMappingURL=user-residence.dto.js.map