"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserResponsesModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_response_entity_1 = require("../../entities/user-response.entity");
const user_responses_controller_1 = require("./user-responses.controller");
const user_responses_service_1 = require("./user-responses.service");
let UserResponsesModule = class UserResponsesModule {
};
exports.UserResponsesModule = UserResponsesModule;
exports.UserResponsesModule = UserResponsesModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([user_response_entity_1.UserResponse])],
        controllers: [user_responses_controller_1.UserResponsesController],
        providers: [user_responses_service_1.UserResponsesService],
        exports: [user_responses_service_1.UserResponsesService],
    })
], UserResponsesModule);
//# sourceMappingURL=user-responses.module.js.map