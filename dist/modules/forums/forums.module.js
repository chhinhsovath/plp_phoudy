"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ForumsModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const forums_controller_1 = require("./forums.controller");
const forums_service_1 = require("./forums.service");
const forum_entity_1 = require("../../entities/forum.entity");
const subject_entity_1 = require("../../entities/subject.entity");
const forum_save_entity_1 = require("../../entities/forum-save.entity");
const forum_like_entity_1 = require("../../entities/forum-like.entity");
const forum_comment_entity_1 = require("../../entities/forum-comment.entity");
const teacher_entity_1 = require("../../entities/teacher.entity");
const student_entity_1 = require("../../entities/student.entity");
const class_entity_1 = require("../../entities/class.entity");
let ForumsModule = class ForumsModule {
};
exports.ForumsModule = ForumsModule;
exports.ForumsModule = ForumsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                forum_entity_1.Forum,
                subject_entity_1.Subject,
                forum_save_entity_1.ForumSave,
                forum_like_entity_1.ForumLike,
                forum_comment_entity_1.ForumComment,
                teacher_entity_1.Teacher,
                student_entity_1.Student,
                class_entity_1.Class,
            ]),
        ],
        controllers: [forums_controller_1.ForumsController],
        providers: [forums_service_1.ForumsService],
        exports: [forums_service_1.ForumsService],
    })
], ForumsModule);
//# sourceMappingURL=forums.module.js.map