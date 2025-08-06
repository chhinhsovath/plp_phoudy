import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ApiResponseMessage } from 'src/common/message.interface';
import { PaginationResult } from 'src/common/pagination.interface';
import { CryptoUtil } from 'src/common/crypto.util';
import { ForumSave } from 'src/entities/forum-save.entity';
import { Repository } from 'typeorm';
import { Audience, Forum, Status } from '../../entities/forum.entity';
import { CreateForumDto, FilterOptions, UpdateForumDto } from './dto/forum.dto';
import { ForumLike } from 'src/entities/forum-like.entity';
import { ForumComment } from 'src/entities/forum-comment.entity';
import { CreateCommentDto, UpdateCommentDto } from './dto/forum-comment.dto';
import { Student } from 'src/entities/student.entity';
import { Teacher } from 'src/entities/teacher.entity';
import { Class } from 'src/entities/class.entity';

@Injectable()
export class ForumsService {
  constructor(
    @InjectRepository(Forum)
    private forumRepository: Repository<Forum>,
    @InjectRepository(ForumSave)
    private forumSaveRepository: Repository<ForumSave>,
    @InjectRepository(ForumLike)
    private forumLikeRepository: Repository<ForumLike>,
    @InjectRepository(ForumComment)
    private forumCommentRepository: Repository<ForumComment>,
    @InjectRepository(Student)
    private studentRepository: Repository<Student>,
    @InjectRepository(Teacher)
    private teacherRepository: Repository<Teacher>,
    @InjectRepository(Class)
    private classRepository: Repository<Class>,
  ) {}

  private async decryptForumContent(forum: Forum): Promise<Forum> {
    if (forum.content) {
      forum.content = await CryptoUtil.decrypt(forum.content);
    }
    return forum;
  }

  private async decryptForumsContent(forums: Forum[]): Promise<Forum[]> {
    return Promise.all(forums.map((forum) => this.decryptForumContent(forum)));
  }

  private async decryptComment(comment: any): Promise<any> {
    if (comment.content) {
      comment.content = await CryptoUtil.decrypt(comment.content);
    }
    return comment;
  }

  async getMyStudentForums(
    options: FilterOptions,
  ): Promise<PaginationResult<Forum>> {
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
      .andWhere('forum.status = :status', { status: Status.ACTIVE });

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

  async getClassForums(
    options: FilterOptions,
  ): Promise<PaginationResult<Forum>> {
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
      .andWhere('forum.status = :status', { status: Status.ACTIVE });

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

  async getPublicOrPrivateForums(
    options: FilterOptions,
  ): Promise<PaginationResult<Forum>> {
    const { audience, subjectId, search, page, limit, userId } = options;

    const query = this.forumRepository
      .createQueryBuilder('forum')
      .leftJoinAndSelect('forum.subject', 'subject')
      .leftJoinAndSelect('forum.user', 'user')
      .loadRelationCountAndMap('forum.likesCount', 'forum.likes')
      .loadRelationCountAndMap('forum.commentsCount', 'forum.comments')
      .loadRelationCountAndMap('forum.savesCount', 'forum.saves')
      .andWhere('forum.status = :status', { status: Status.ACTIVE });

    if (!userId) {
      query.where('forum.audience = :audience', { audience: Audience.PUBLIC });
    } else {
      if (audience === 'YOUR') {
        query.where('forum.usersId = :id', { id: userId });
      } else if (audience === 'SAVE') {
        query.innerJoin('forum.saves', 'saves', 'saves.userId = :userId', {
          userId,
        });
      } else if (
        audience &&
        Object.values(Audience).includes(audience as Audience)
      ) {
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

  async getFilteredForums(
    options: FilterOptions,
  ): Promise<PaginationResult<Forum>> {
    const { audience } = options;

    if (audience === 'CLASS') {
      return this.getClassForums(options);
    }
    if (audience === 'STUDENT') {
      return this.getMyStudentForums(options);
    }

    return this.getPublicOrPrivateForums(options);
  }

  async findAll(): Promise<Forum[]> {
    const forums = await this.forumRepository.find({
      relations: ['subject', 'user'],
    });
    return this.decryptForumsContent(forums);
  }

  async checkIsLiked(forumId: number, userId?: number): Promise<boolean> {
    if (!userId) return false;
    return this.forumLikeRepository.exists({
      where: {
        userId,
        forum: { id: forumId }, // if `forum` is a relation
      },
    });
  }

  async checkIsSaved(forumId: number, userId?: number): Promise<boolean> {
    if (!userId) return false;
    return this.forumSaveRepository.exists({
      where: {
        userId,
        forum: { id: forumId }, // if `forum` is a relation
      },
    });
  }

  async findOne(id: number, userId?: number) {
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
      throw new NotFoundException(`Forum with ID ${id} not found`);
    }

    const decryptedForum = await this.decryptForumContent(forum);
    return {
      ...decryptedForum,
      id: Number(decryptedForum.id),
      isLiked,
      isSaved,
    };
  }

  async findBySubjectId(subjectId: number): Promise<Forum[]> {
    const forums = await this.forumRepository.find({
      where: { subjectId: subjectId },
      relations: ['subject', 'user'],
    });
    return this.decryptForumsContent(forums);
  }

  async findByUserId(userId: number): Promise<Forum[]> {
    const forums = await this.forumRepository.find({
      where: { usersId: userId },
      relations: ['subject', 'user'],
    });
    return this.decryptForumsContent(forums);
  }

  async findByAudience(audience: Audience): Promise<Forum[]> {
    const forums = await this.forumRepository.find({
      where: { audience },
      relations: ['subject', 'user'],
    });
    return this.decryptForumsContent(forums);
  }

  async findByGrade(grade: string): Promise<Forum[]> {
    const forums = await this.forumRepository.find({
      where: { grade },
      relations: ['subject', 'user'],
    });
    return this.decryptForumsContent(forums);
  }

  async create(createForumDto: CreateForumDto, userId: string): Promise<Forum> {
    const encryptedContent = createForumDto.content
      ? await CryptoUtil.encrypt(createForumDto.content)
      : createForumDto.content;

    const forum = this.forumRepository.create({
      ...createForumDto,
      content: encryptedContent,
      usersId: Number(userId),
    });

    return this.forumRepository.save(forum);
  }

  async update(id: number, updateForumDto: UpdateForumDto): Promise<Forum> {
    console.log('Update Forum DTO:', updateForumDto);
    console.log('Forum ID:', id);

    const forum = await this.forumRepository.findOne({
      where: { id },
      relations: ['subject', 'user'],
    });

    if (!forum) {
      throw new NotFoundException(`Forum with ID ${id} not found`);
    }

    console.log('Current forum subjectId:', forum.subjectId);
    console.log('New subjectId from DTO:', updateForumDto.subjectId);

    const encryptedContent = updateForumDto.content
      ? await CryptoUtil.encrypt(updateForumDto.content)
      : updateForumDto.content;

    // Update properties
    Object.assign(forum, { ...updateForumDto, content: encryptedContent });

    // Ensure subjectId is properly handled
    if (updateForumDto.subjectId !== undefined) {
      forum.subjectId = updateForumDto.subjectId;
      console.log('Updated forum subjectId to:', forum.subjectId);
    }

    const updatedForum = await this.forumRepository.save(forum);
    console.log('Saved forum subjectId:', updatedForum.subjectId);
    return this.decryptForumContent(updatedForum);
  }

  async incrementViewCount(id: number): Promise<Forum> {
    const forum = await this.forumRepository.findOneBy({ id });
    if (!forum) {
      throw new NotFoundException(`Forum with ID ${id} not found`);
    }
    forum.viewCount += 1;
    const savedForum = await this.forumRepository.save(forum);
    return this.decryptForumContent(savedForum);
  }

  async remove(id: number): Promise<void> {
    const result = await this.forumRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Forum with ID ${id} not found`);
    }
  }

  async togglerSaveForum(
    forumId: number,
    userId: number,
  ): Promise<ApiResponseMessage & { forum?: { id: number; title: string } }> {
    const existing = await this.forumSaveRepository.findOne({
      where: { forumId, userId },
      relations: ['forum'],
    });

    if (existing) {
      // Remove the saved record (unsave)
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

    // Create new save record
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

  async togglerLikeForum(
    forumId: number,
    userId: number,
  ): Promise<ApiResponseMessage & { forum?: { id: number; title: string } }> {
    const existing = await this.forumLikeRepository.findOne({
      where: { forumId, userId },
      relations: ['forum'],
    });

    if (existing) {
      // Remove the saved record (unsave)
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

    // Create new save record
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

  async creatComment(createDto: CreateCommentDto, userId: number) {
    const encryptedContent = await CryptoUtil.encrypt(createDto.content);

    const comment = this.forumCommentRepository.create({
      ...createDto,
      content: encryptedContent,
      userId,
    });
    const savedComment = await this.forumCommentRepository.save(comment);
    return this.decryptComment(savedComment);
  }

  async updateComment(id: number, dto: UpdateCommentDto, userId: number) {
    const comment = await this.forumCommentRepository.findOneBy({ id });
    if (!comment || comment.userId !== userId) {
      throw new NotFoundException('Comment not found or unauthorized');
    }

    const encryptedContent = dto.content
      ? await CryptoUtil.encrypt(dto.content)
      : dto.content;

    Object.assign(comment, { ...dto, content: encryptedContent });
    const savedComment = await this.forumCommentRepository.save(comment);
    return this.decryptComment(savedComment);
  }

  async removeComment(id: number, userId: number) {
    const comment = await this.forumCommentRepository.findOneBy({ id });
    if (!comment || comment.userId !== userId) {
      throw new NotFoundException('Comment not found or unauthorized');
    }

    return this.forumCommentRepository.remove(comment);
  }

  async getForumComments(forumId: number) {
    const comments = await this.forumCommentRepository.find({
      where: { forumId },
      relations: ['user'],
      order: { createdAt: 'ASC' },
    });

    return Promise.all(comments.map((comment) => this.decryptComment(comment)));
  }
}
