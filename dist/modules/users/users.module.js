"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("../../entities/user.entity");
const user_residence_entity_1 = require("../../entities/user-residence.entity");
const user_pob_entity_1 = require("../../entities/user-pob.entity");
const province_entity_1 = require("../../entities/province.entity");
const district_entity_1 = require("../../entities/district.entity");
const commune_entity_1 = require("../../entities/commune.entity");
const village_entity_1 = require("../../entities/village.entity");
const users_service_1 = require("./users.service");
const users_controller_1 = require("./users.controller");
const teacher_entity_1 = require("../../entities/teacher.entity");
let UsersModule = class UsersModule {
};
exports.UsersModule = UsersModule;
exports.UsersModule = UsersModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                user_entity_1.User,
                user_residence_entity_1.UserResidence,
                user_pob_entity_1.UserPob,
                teacher_entity_1.Teacher,
                province_entity_1.Province,
                district_entity_1.District,
                commune_entity_1.Commune,
                village_entity_1.Village,
            ]),
        ],
        controllers: [users_controller_1.UsersController],
        providers: [users_service_1.UsersService],
        exports: [users_service_1.UsersService],
    })
], UsersModule);
//# sourceMappingURL=users.module.js.map