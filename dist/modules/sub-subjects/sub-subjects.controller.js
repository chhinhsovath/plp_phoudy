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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubSubjectsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const sub_subjects_service_1 = require("./sub-subjects.service");
const create_sub_subject_dto_1 = require("./dto/create-sub-subject.dto");
const update_sub_subject_dto_1 = require("./dto/update-sub-subject.dto");
const sub_subject_dto_1 = require("./dto/sub-subject.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../auth/guards/roles.guard");
const roles_decorator_1 = require("../auth/decorators/roles.decorator");
let SubSubjectsController = class SubSubjectsController {
    subSubjectsService;
    constructor(subSubjectsService) {
        this.subSubjectsService = subSubjectsService;
    }
    create(createSubSubjectDto) {
        return this.subSubjectsService.create(createSubSubjectDto);
    }
    findAll() {
        return this.subSubjectsService.findAll();
    }
    findBySubject(subjectId) {
        return this.subSubjectsService.findBySubject(+subjectId);
    }
    findByStatus(status) {
        return this.subSubjectsService.findByStatus(status);
    }
    findOne(id) {
        return this.subSubjectsService.findOne(+id);
    }
    update(id, updateSubSubjectDto) {
        return this.subSubjectsService.update(+id, updateSubSubjectDto);
    }
    remove(id) {
        return this.subSubjectsService.remove(+id);
    }
};
exports.SubSubjectsController = SubSubjectsController;
__decorate([
    (0, common_1.Post)(),
    (0, roles_decorator_1.Roles)('ADMIN', 'TEACHER'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new sub subject' }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Sub subject successfully created',
        type: sub_subject_dto_1.SubSubjectDto,
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_sub_subject_dto_1.CreateSubSubjectDto]),
    __metadata("design:returntype", void 0)
], SubSubjectsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all sub subjects' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Return all sub subjects',
        type: [sub_subject_dto_1.SubSubjectDto],
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], SubSubjectsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('by-subject/:subjectId'),
    (0, swagger_1.ApiOperation)({ summary: 'Get sub subjects by subject ID' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Return sub subjects for the specified subject',
        type: [sub_subject_dto_1.SubSubjectDto],
    }),
    __param(0, (0, common_1.Param)('subjectId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], SubSubjectsController.prototype, "findBySubject", null);
__decorate([
    (0, common_1.Get)('by-status'),
    (0, swagger_1.ApiOperation)({ summary: 'Get sub subjects by status' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Return sub subjects with the specified status',
        type: [sub_subject_dto_1.SubSubjectDto],
    }),
    __param(0, (0, common_1.Query)('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], SubSubjectsController.prototype, "findByStatus", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get a sub subject by ID' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Return the sub subject',
        type: sub_subject_dto_1.SubSubjectDto,
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Sub subject not found' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], SubSubjectsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, roles_decorator_1.Roles)('ADMIN', 'TEACHER'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, swagger_1.ApiOperation)({ summary: 'Update a sub subject' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Sub subject successfully updated',
        type: sub_subject_dto_1.SubSubjectDto,
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Sub subject not found' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_sub_subject_dto_1.UpdateSubSubjectDto]),
    __metadata("design:returntype", void 0)
], SubSubjectsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, roles_decorator_1.Roles)('ADMIN'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, swagger_1.ApiOperation)({ summary: 'Delete a sub subject' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Sub subject successfully deleted' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Sub subject not found' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], SubSubjectsController.prototype, "remove", null);
exports.SubSubjectsController = SubSubjectsController = __decorate([
    (0, swagger_1.ApiTags)('Sub Subjects'),
    (0, common_1.Controller)('sub-subjects'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __metadata("design:paramtypes", [sub_subjects_service_1.SubSubjectsService])
], SubSubjectsController);
//# sourceMappingURL=sub-subjects.controller.js.map