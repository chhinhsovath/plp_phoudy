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
exports.ChatDTOGemma = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
class ChatDTOGemma {
    message;
    teacherTitle;
    isFirstInteraction;
}
exports.ChatDTOGemma = ChatDTOGemma;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The message to send to Gemma 3',
        example: 'How do I solve 5 + 3?',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ChatDTOGemma.prototype, "message", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The title of the teacher (used in the prompt)',
        example: 'គ្រូ',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ChatDTOGemma.prototype, "teacherTitle", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Whether this is the first interaction in the conversation',
        example: true,
    }),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], ChatDTOGemma.prototype, "isFirstInteraction", void 0);
//# sourceMappingURL=chat.dto.js.map