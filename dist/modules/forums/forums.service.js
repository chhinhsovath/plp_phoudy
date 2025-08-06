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
exports.ForumsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const crypto_util_1 = require("../../common/crypto.util");
const forum_save_entity_1 = require("../../entities/forum-save.entity");
const typeorm_2 = require("typeorm");
const forum_entity_1 = require("../../entities/forum.entity");
const forum_like_entity_1 = require("../../entities/forum-like.entity");
const forum_comment_entity_1 = require("../../entities/forum-comment.entity");
const student_entity_1 = require("../../entities/student.entity");
const teacher_entity_1 = require("../../entities/teacher.entity");
const class_entity_1 = require("../../entities/class.entity");
let ForumsService = class ForumsService {
    forumRepository;
    forumSaveRepository;
    forumLikeRepository;
    forumCommentRepository;
    studentRepository;
    teacherRepository;
    classRepository;
    constructor(forumRepository, forumSaveRepository, forumLikeRepository, forumCommentRepository, studentRepository, teacherRepository, classRepository) {
        this.forumRepository = forumRepository;
        this.forumSaveRepository = forumSaveRepository;
        this.forumLikeRepository = forumLikeRepository;
        this.forumCommentRepository = forumCommentRepository;
        this.studentRepository = studentRepository;
        this.teacherRepository = teacherRepository;
        this.classRepository = classRepository;
    }
    async decryptForumContent(forum) {
        if (forum.content) {
            forum.content = await crypto_util_1.CryptoUtil.decrypt(forum.content);
        }
        return forum;
    }
    async decryptForumsContent(forums) {
        return Promise.all(forums.map((forum) => this.decryptForumContent(forum)));
    }
    async decryptComment(comment) {
        if (comment.content) {
            comment.content = await crypto_util_1.CryptoUtil.decrypt(comment.content);
        }
        return comment;
    }
    async getMyStudentForums(options) {
        const { subjectId, search, page, limit } = options;
        const classesId = await this.classRepository
            .createQueryBuilder('class')
            .innerJoin('class.teacher', 'teacher')
            .where('teacher.userId = :userId', { userId: options.userId })
            .getMany();
        if (classesId.length === 0) {
            return {
                data: [],
                total: 0,
                page,
                limit,
                totalPages: 0,
            };
        }
        const students = await this.studentRepository
            .createQueryBuilder('student')
            .where('student.classId IN (:...classIds)', {
            classIds: classesId.map((item) => item.classId),
        })
            .getMany();
        if (students.length === 0) {
            return {
                data: [],
                total: 0,
                page,
                limit,
                totalPages: 0,
            };
        }
        const query = this.forumRepository
            .createQueryBuilder('forum')
            .leftJoinAndSelect('forum.subject', 'subject')
            .leftJoinAndSelect('forum.user', 'user')
            .loadRelationCountAndMap('forum.likesCount', 'forum.likes')
            .loadRelationCountAndMap('forum.commentsCount', 'forum.comments')
            .loadRelationCountAndMap('forum.savesCount', 'forum.saves')
            .where('forum.usersId IN (:...userIds)', {
            userIds: students.map((item) => item.userId),
        })
            .andWhere('forum.status = :status', { status: forum_entity_1.Status.ACTIVE });
        if (subjectId) {
            query.andWhere('forum.subjectId = :subjectId', {
                subjectId,
            });
        }
        if (search) {
            query.andWhere('LOWER(forum.title) LIKE :search', {
                search: `%${search.toLowerCase()}%`,
            });
        }
        query.orderBy('forum.createdAt', 'DESC');
        query.skip((page - 1) * limit).take(limit);
        const [data, total] = await query.getManyAndCount();
        const decryptedData = await this.decryptForumsContent(data);
        return {
            data: decryptedData,
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit),
        };
    }
    async getClassForums(options) {
        const { subjectId, search, page, limit } = options;
        const classesId = await this.classRepository
            .createQueryBuilder('class')
            .innerJoin('class.teacher', 'teacher')
            .where('teacher.userId = :userId', { userId: options.userId })
            .getMany();
        if (classesId.length === 0) {
            return {
                data: [],
                total: 0,
                page,
                limit,
                totalPages: 0,
            };
        }
        const students = await this.studentRepository
            .createQueryBuilder('student')
            .where('student.classId IN (:...classIds)', {
            classIds: classesId.map((item) => item.classId),
        })
            .getMany();
        if (students.length === 0) {
            return {
                data: [],
                total: 0,
                page,
                limit,
                totalPages: 0,
            };
        }
        const query = this.forumRepository
            .createQueryBuilder('forum')
            .leftJoinAndSelect('forum.subject', 'subject')
            .leftJoinAndSelect('forum.user', 'user')
            .loadRelationCountAndMap('forum.likesCount', 'forum.likes')
            .loadRelationCountAndMap('forum.commentsCount', 'forum.comments')
            .loadRelationCountAndMap('forum.savesCount', 'forum.saves')
            .where('forum.usersId IN (:...userIds)', {
            userIds: [...students.map((item) => item.userId), options.userId],
        })
            .andWhere('forum.status = :status', { status: forum_entity_1.Status.ACTIVE });
        if (subjectId) {
            query.andWhere('forum.subjectId = :subjectId', {
                subjectId,
            });
        }
        if (search) {
            query.andWhere('LOWER(forum.title) LIKE :search', {
                search: `%${search.toLowerCase()}%`,
            });
        }
        query.orderBy('forum.createdAt', 'DESC');
        query.skip((page - 1) * limit).take(limit);
        const [data, total] = await query.getManyAndCount();
        const decryptedData = await this.decryptForumsContent(data);
        return {
            data: decryptedData,
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit),
        };
    }
    async getPublicOrPrivateForums(options) {
        const { audience, subjectId, search, page, limit, userId } = options;
        const query = this.forumRepository
            .createQueryBuilder('forum')
            .leftJoinAndSelect('forum.subject', 'subject')
            .leftJoinAndSelect('forum.user', 'user')
            .loadRelationCountAndMap('forum.likesCount', 'forum.likes')
            .loadRelationCountAndMap('forum.commentsCount', 'forum.comments')
            .loadRelationCountAndMap('forum.savesCount', 'forum.saves')
            .andWhere('forum.status = :status', { status: forum_entity_1.Status.ACTIVE });
        if (!userId) {
            query.where('forum.audience = :audience', { audience: forum_entity_1.Audience.PUBLIC });
        }
        else {
            if (audience === 'YOUR') {
                query.where('forum.usersId = :id', { id: userId });
            }
            else if (audience === 'SAVE') {
                query.innerJoin('forum.saves', 'saves', 'saves.userId = :userId', {
                    userId,
                });
            }
            else if (audience &&
                Object.values(forum_entity_1.Audience).includes(audience)) {
                query.where('forum.audience = :audience', { audience });
            }
        }
        if (subjectId) {
            query.andWhere('forum.subjectId = :subjectId', {
                subjectId,
            });
        }
        if (search) {
            query.andWhere('LOWER(forum.title) LIKE :search', {
                search: `%${search.toLowerCase()}%`,
            });
        }
        query.orderBy('forum.createdAt', 'DESC');
        query.skip((page - 1) * limit).take(limit);
        const [data, total] = await query.getManyAndCount();
        const decryptedData = await this.decryptForumsContent(data);
        return {
            data: decryptedData,
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit),
        };
    }
    async getFilteredForums(options) {
        const { audience } = options;
        if (audience === 'CLASS') {
            return this.getClassForums(options);
        }
        if (audience === 'STUDENT') {
            return this.getMyStudentForums(options);
        }
        return this.getPublicOrPrivateForums(options);
    }
    async findAll() {
        const forums = await this.forumRepository.find({
            relations: ['subject', 'user'],
        });
        return this.decryptForumsContent(forums);
    }
    async checkIsLiked(forumId, userId) {
        if (!userId)
            return false;
        return this.forumLikeRepository.exists({
            where: {
                userId,
                forum: { id: forumId },
            },
        });
    }
    async checkIsSaved(forumId, userId) {
        if (!userId)
            return false;
        return this.forumSaveRepository.exists({
            where: {
                userId,
                forum: { id: forumId },
            },
        });
    }
    async findOne(id, userId) {
        const findForum = this.forumRepository
            .createQueryBuilder('forum')
            .leftJoinAndSelect('forum.subject', 'subject')
            .leftJoinAndSelect('forum.user', 'user')
            .loadRelationCountAndMap('forum.likesCount', 'forum.likes')
            .loadRelationCountAndMap('forum.commentsCount', 'forum.comments')
            .loadRelationCountAndMap('forum.savesCount', 'forum.saves')
            .where('forum.id = :id', { id })
            .getOne();
        const [forum, isLiked, isSaved] = await Promise.all([
            findForum,
            this.checkIsLiked(id, userId),
            this.checkIsSaved(id, userId),
        ]);
        if (!forum) {
            throw new common_1.NotFoundException(`Forum with ID ${id} not found`);
        }
        const decryptedForum = await this.decryptForumContent(forum);
        return {
            ...decryptedForum,
            id: Number(decryptedForum.id),
            isLiked,
            isSaved,
        };
    }
    async findBySubjectId(subjectId) {
        const forums = await this.forumRepository.find({
            where: { subjectId: subjectId },
            relations: ['subject', 'user'],
        });
        return this.decryptForumsContent(forums);
    }
    async findByUserId(userId) {
        const forums = await this.forumRepository.find({
            where: { usersId: userId },
            relations: ['subject', 'user'],
        });
        return this.decryptForumsContent(forums);
    }
    async findByAudience(audience) {
        const forums = await this.forumRepository.find({
            where: { audience },
            relations: ['subject', 'user'],
        });
        return this.decryptForumsContent(forums);
    }
    async findByGrade(grade) {
        const forums = await this.forumRepository.find({
            where: { grade },
            relations: ['subject', 'user'],
        });
        return this.decryptForumsContent(forums);
    }
    async create(createForumDto, userId) {
        const encryptedContent = createForumDto.content
            ? await crypto_util_1.CryptoUtil.encrypt(createForumDto.content)
            : createForumDto.content;
        const forum = this.forumRepository.create({
            ...createForumDto,
            content: encryptedContent,
            usersId: Number(userId),
        });
        return this.forumRepository.save(forum);
    }
    async update(id, updateForumDto) {
        console.log('Update Forum DTO:', updateForumDto);
        console.log('Forum ID:', id);
        const forum = await this.forumRepository.findOne({
            where: { id },
            relations: ['subject', 'user'],
        });
        if (!forum) {
            throw new common_1.NotFoundException(`Forum with ID ${id} not found`);
        }
        console.log('Current forum subjectId:', forum.subjectId);
        console.log('New subjectId from DTO:', updateForumDto.subjectId);
        const encryptedContent = updateForumDto.content
            ? await crypto_util_1.CryptoUtil.encrypt(updateForumDto.content)
            : updateForumDto.content;
        Object.assign(forum, { ...updateForumDto, content: encryptedContent });
        if (updateForumDto.subjectId !== undefined) {
            forum.subjectId = updateForumDto.subjectId;
            console.log('Updated forum subjectId to:', forum.subjectId);
        }
        const updatedForum = await this.forumRepository.save(forum);
        console.log('Saved forum subjectId:', updatedForum.subjectId);
        return this.decryptForumContent(updatedForum);
    }
    async incrementViewCount(id) {
        const forum = await this.forumRepository.findOneBy({ id });
        if (!forum) {
            throw new common_1.NotFoundException(`Forum with ID ${id} not found`);
        }
        forum.viewCount += 1;
        const savedForum = await this.forumRepository.save(forum);
        return this.decryptForumContent(savedForum);
    }
    async remove(id) {
        const result = await this.forumRepository.delete(id);
        if (result.affected === 0) {
            throw new common_1.NotFoundException(`Forum with ID ${id} not found`);
        }
    }
    async togglerSaveForum(forumId, userId) {
        const existing = await this.forumSaveRepository.findOne({
            where: { forumId, userId },
            relations: ['forum'],
        });
        if (existing) {
            await this.forumSaveRepository.remove(existing);
            return {
                status: 'success',
                message: `Forum '${existing.forum.title}' (ID: ${existing.forum.id}) unsaved successfully.`,
                forum: {
                    id: existing.forum.id,
                    title: existing.forum.title,
                },
            };
        }
        const forum = await this.forumRepository.findOneBy({ id: forumId });
        if (!forum) {
            return {
                status: 'error',
                message: `Forum with ID ${forumId} not found.`,
            };
        }
        const save = this.forumSaveRepository.create({ forumId, userId });
        await this.forumSaveRepository.save(save);
        return {
            status: 'success',
            message: `Forum '${forum.title}' (ID: ${forum.id}) saved successfully.`,
            forum: {
                id: forum.id,
                title: forum.title,
            },
        };
    }
    async togglerLikeForum(forumId, userId) {
        const existing = await this.forumLikeRepository.findOne({
            where: { forumId, userId },
            relations: ['forum'],
        });
        if (existing) {
            await this.forumLikeRepository.remove(existing);
            return {
                status: 'success',
                message: `Forum '${existing.forum.title}' (ID: ${existing.forum.id}) unliked successfully.`,
                forum: {
                    id: existing.forum.id,
                    title: existing.forum.title,
                },
            };
        }
        const forum = await this.forumRepository.findOneBy({ id: forumId });
        if (!forum) {
            return {
                status: 'error',
                message: `Forum with ID ${forumId} not found.`,
            };
        }
        const save = this.forumLikeRepository.create({ forumId, userId });
        await this.forumLikeRepository.save(save);
        return {
            status: 'success',
            message: `Forum '${forum.title}' (ID: ${forum.id}) liked successfully.`,
            forum: {
                id: forum.id,
                title: forum.title,
            },
        };
    }
    async creatComment(createDto, userId) {
        const encryptedContent = await crypto_util_1.CryptoUtil.encrypt(createDto.content);
        const comment = this.forumCommentRepository.create({
            ...createDto,
            content: encryptedContent,
            userId,
        });
        const savedComment = await this.forumCommentRepository.save(comment);
        return this.decryptComment(savedComment);
    }
    async updateComment(id, dto, userId) {
        const comment = await this.forumCommentRepository.findOneBy({ id });
        if (!comment || comment.userId !== userId) {
            throw new common_1.NotFoundException('Comment not found or unauthorized');
        }
        const encryptedContent = dto.content
            ? await crypto_util_1.CryptoUtil.encrypt(dto.content)
            : dto.content;
        Object.assign(comment, { ...dto, content: encryptedContent });
        const savedComment = await this.forumCommentRepository.save(comment);
        return this.decryptComment(savedComment);
    }
    async removeComment(id, userId) {
        const comment = await this.forumCommentRepository.findOneBy({ id });
        if (!comment || comment.userId !== userId) {
            throw new common_1.NotFoundException('Comment not found or unauthorized');
        }
        return this.forumCommentRepository.remove(comment);
    }
    async getForumComments(forumId) {
        const comments = await this.forumCommentRepository.find({
            where: { forumId },
            relations: ['user'],
            order: { createdAt: 'ASC' },
        });
        return Promise.all(comments.map((comment) => this.decryptComment(comment)));
    }
};
exports.ForumsService = ForumsService;
exports.ForumsService = ForumsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(forum_entity_1.Forum)),
    __param(1, (0, typeorm_1.InjectRepository)(forum_save_entity_1.ForumSave)),
    __param(2, (0, typeorm_1.InjectRepository)(forum_like_entity_1.ForumLike)),
    __param(3, (0, typeorm_1.InjectRepository)(forum_comment_entity_1.ForumComment)),
    __param(4, (0, typeorm_1.InjectRepository)(student_entity_1.Student)),
    __param(5, (0, typeorm_1.InjectRepository)(teacher_entity_1.Teacher)),
    __param(6, (0, typeorm_1.InjectRepository)(class_entity_1.Class)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], ForumsService);
//# sourceMappingURL=forums.service.js.map