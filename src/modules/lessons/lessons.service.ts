import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Lesson } from '../../entities/lesson.entity';
import { LessonActivity } from '../../entities/lesson-activity.entity';
import { Subject } from '../../entities/subject.entity';
import { User } from '../../entities/user.entity';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';
import { LessonActivityDto } from './dto/lesson-activity.dto';
import { Status } from '../../entities/enums/status.enum';
import { LessonResponseDto } from './dto/lesson-response.dto';

interface LessonRawResult {
  id: number;
  subjectId: number;
  title: string;
  description: string;
  grade_level: number;
  lesson_number: number;
  createdBy: number;
  status: string;
  is_hidden: boolean;
  subject_name_en: string;
  subject_name_kh: string;
  creator_first_name: string;
  creator_last_name: string;
}

@Injectable()
export class LessonsService {
  constructor(
    @InjectRepository(Lesson)
    private lessonRepository: Repository<Lesson>,
    @InjectRepository(LessonActivity)
    private lessonActivityRepository: Repository<LessonActivity>,
    @InjectRepository(Subject)
    private subjectRepository: Repository<Subject>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<Lesson[]> {
    return this.lessonRepository.find({
      relations: ['subject', 'creator'],
    });
  }

  async findOne(id: number): Promise<Lesson> {
    const lesson = await this.lessonRepository.findOne({
      where: { id },
      relations: ['subject', 'creator'],
    });

    if (!lesson) {
      throw new NotFoundException(`Lesson with ID ${id} not found`);
    }

    return lesson;
  }

  async findBySubjectAndGrade(
    subjectId: number,
    gradeLevel: number,
  ): Promise<Lesson[]> {
    return this.lessonRepository.find({
      where: {
        subjectId,
        grade_level: gradeLevel,
      },
      relations: ['subject', 'creator'],
    });
  }

  async findActiveBySubjectAndGrade(
    subjectId: number,
    gradeLevel: number,
  ): Promise<Lesson[]> {
    return this.lessonRepository.find({
      where: {
        subjectId,
        grade_level: gradeLevel,
        status: Status.ACTIVE,
      },
      relations: ['subject', 'creator'],
      order: { created_at: 'DESC' },
    });
  }

  async findBySubjectAndGradeOrderByLessonNumber(
    subjectId: number,
    gradeLevel: number,
  ): Promise<Lesson[]> {
    return this.lessonRepository.find({
      where: {
        subjectId,
        grade_level: gradeLevel,
      },
      relations: ['subject', 'creator'],
      order: { lesson_number: 'ASC' },
    });
  }

  async findActiveBySubjectAndGradeOrderByLessonNumber(
    subjectId: number,
    gradeLevel: number,
  ): Promise<Lesson[]> {
    return this.lessonRepository.find({
      where: {
        subjectId,
        grade_level: gradeLevel,
        status: Status.ACTIVE,
      },
      relations: ['subject', 'creator'],
      order: { lesson_number: 'ASC' },
    });
  }

  async create(
    createLessonDto: CreateLessonDto,
    userId: number,
  ): Promise<Lesson> {
    const subject = await this.subjectRepository.findOne({
      where: { id: createLessonDto.subjectId },
    });

    if (!subject) {
      throw new NotFoundException(
        `Subject with ID ${createLessonDto.subjectId} not found`,
      );
    }

    const creator = await this.userRepository.findOne({
      where: { id: userId },
    });

    if (!creator) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    const lesson = new Lesson();
    lesson.title = createLessonDto.title;
    if (createLessonDto.description !== undefined) {
      lesson.description = createLessonDto.description;
    }
    lesson.grade_level = createLessonDto.gradeLevel;
    lesson.lesson_number = createLessonDto.lessonNumber;
    lesson.is_hidden = createLessonDto.isHidden || false;
    lesson.status =
      createLessonDto.status === 'INACTIVE' ? Status.INACTIVE : Status.ACTIVE;
    lesson.subject = subject;
    lesson.creator = creator;

    return this.lessonRepository.save(lesson);
  }

  async update(id: number, updateLessonDto: UpdateLessonDto): Promise<Lesson> {
    const lesson = await this.findOne(id);

    if (updateLessonDto.subjectId) {
      const subject = await this.subjectRepository.findOne({
        where: { id: updateLessonDto.subjectId },
      });

      if (!subject) {
        throw new NotFoundException(
          `Subject with ID ${updateLessonDto.subjectId} not found`,
        );
      }

      lesson.subject = subject;
    }

    if (updateLessonDto.title) lesson.title = updateLessonDto.title;
    if (updateLessonDto.description !== undefined)
      lesson.description = updateLessonDto.description;
    if (updateLessonDto.gradeLevel)
      lesson.grade_level = updateLessonDto.gradeLevel;
    if (updateLessonDto.lessonNumber)
      lesson.lesson_number = updateLessonDto.lessonNumber;
    if (updateLessonDto.isHidden !== undefined)
      lesson.is_hidden = updateLessonDto.isHidden;
    if (updateLessonDto.status) {
      lesson.status =
        updateLessonDto.status === 'INACTIVE' ? Status.INACTIVE : Status.ACTIVE;
    }

    return this.lessonRepository.save(lesson);
  }

  async remove(id: number): Promise<void> {
    const result = await this.lessonRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Lesson with ID ${id} not found`);
    }
  }

  // Lesson Activity methods
  async findLessonActivitiesBySubjectAndGrade(
    subjectId: number,
    gradeLevel: number,
  ): Promise<LessonActivityDto[]> {
    const lessons = await this.findBySubjectAndGrade(subjectId, gradeLevel);
    const lessonIds = lessons.map((lesson) => lesson.id);

    const activities = await this.lessonActivityRepository
      .createQueryBuilder('activity')
      .where('activity.lesson_id IN (:...lessonIds)', { lessonIds })
      .getMany();

    return activities.map((activity) => this.convertToActivityDto(activity));
  }

  async findLessonActivitiesBySubjectAndGradeOrdered(
    subjectId: number,
    gradeLevel: number,
  ): Promise<LessonActivityDto[]> {
    const lessons = await this.findBySubjectAndGradeOrderByLessonNumber(
      subjectId,
      gradeLevel,
    );
    const lessonIds = lessons.map((lesson) => lesson.id);

    const activities = await this.lessonActivityRepository
      .createQueryBuilder('activity')
      .where('activity.lesson_id IN (:...lessonIds)', { lessonIds })
      .orderBy('activity.order_index', 'ASC')
      .getMany();

    return activities.map((activity) => this.convertToActivityDto(activity));
  }

  async findLessonActivitiesByLessonId(
    lessonId: number,
  ): Promise<LessonActivityDto[]> {
    const activities = await this.lessonActivityRepository.find({
      where: { lessonId },
      order: { order_index: 'ASC' },
    });

    return activities.map((activity) => this.convertToActivityDto(activity));
  }

  async findSimplifiedBySubjectAndGrade(
    subjectId: number,
    gradeLevel: number,
  ): Promise<any[]> {
    const lessons = await this.lessonRepository
      .createQueryBuilder('lesson')
      .leftJoinAndSelect('lesson.subject', 'subject')
      .select([
        'lesson.id',
        'lesson.title',
        'lesson.lesson_number',
        'lesson.grade_level',
        'lesson.status',
        'subject.id',
        'subject.name',
        'subject.khmer_name',
      ])
      .where('lesson.subjectId = :subjectId', { subjectId })
      .andWhere('lesson.grade_level = :gradeLevel', { gradeLevel })
      .andWhere('lesson.status = :status', { status: Status.ACTIVE })
      .orderBy('lesson.lesson_number', 'ASC')
      .getMany();

    return lessons.map((lesson) => ({
      id: lesson.id,
      title: lesson.title,
      lesson_number: lesson.lesson_number,
      grade_level: lesson.grade_level,
      status: lesson.status,
      subject: {
        id: lesson.subject.id,
        name: lesson.subject.name,
        khmer_name: lesson.subject.khmer_name,
      },
    }));
  }

  private convertToActivityDto(activity: LessonActivity): LessonActivityDto {
    return {
      id: activity.id,
      lessonId: activity.lessonId,
      title: activity.title,
      orderIndex: activity.order_index,
      status: activity.status,
      createdAt: activity.created_at,
      updatedAt: activity.updated_at,
    };
  }

  async findBySubject(subjectId: number): Promise<LessonResponseDto[]> {
    const lessons = await this.lessonRepository
      .createQueryBuilder('lesson')
      .leftJoinAndSelect('lesson.subject', 'subject')
      .where('lesson.subjectId = :subjectId', { subjectId })
      .orderBy('lesson.grade_level', 'ASC')
      .addOrderBy('lesson.lesson_number', 'ASC')
      .getMany();

    return lessons.map((lesson) => ({
      id: lesson.id,
      title: lesson.title,
      grade_level: lesson.grade_level,
      lesson_number: lesson.lesson_number,
      subject: {
        name: lesson.subject.name,
        khmer_name: lesson.subject.khmer_name,
      },
      status: lesson.status,
    }));
  }

  async findActiveBySubject(subjectId: number): Promise<LessonResponseDto[]> {
    const lessons = await this.lessonRepository
      .createQueryBuilder('lesson')
      .leftJoinAndSelect('lesson.subject', 'subject')
      .where('lesson.subjectId = :subjectId', { subjectId })
      .andWhere('lesson.status = :status', { status: 'ACTIVE' })
      .orderBy('lesson.grade_level', 'ASC')
      .addOrderBy('lesson.lesson_number', 'ASC')
      .getMany();

    return lessons.map((lesson) => ({
      id: lesson.id,
      title: lesson.title,
      grade_level: lesson.grade_level,
      lesson_number: lesson.lesson_number,
      subject: {
        name: lesson.subject.name,
        khmer_name: lesson.subject.khmer_name,
      },
      status: lesson.status,
    }));
  }

  async findBySubjectName(subjectName: string): Promise<LessonResponseDto[]> {
    const lessons = await this.lessonRepository
      .createQueryBuilder('lesson')
      .leftJoinAndSelect('lesson.subject', 'subject')
      .where('LOWER(subject.name) = LOWER(:subjectName)', { subjectName })
      .orderBy('lesson.grade_level', 'ASC')
      .addOrderBy('lesson.lesson_number', 'ASC')
      .getMany();

    if (!lessons.length) {
      throw new NotFoundException(
        `No lessons found for subject: ${subjectName}`,
      );
    }

    return lessons.map((lesson) => ({
      id: lesson.id,
      title: lesson.title,
      grade_level: lesson.grade_level,
      lesson_number: lesson.lesson_number,
      subject: {
        name: lesson.subject.name,
        khmer_name: lesson.subject.khmer_name,
      },
      status: lesson.status,
    }));
  }

  async findActiveBySubjectName(
    subjectName: string,
  ): Promise<LessonResponseDto[]> {
    const lessons = await this.lessonRepository
      .createQueryBuilder('lesson')
      .leftJoinAndSelect('lesson.subject', 'subject')
      .where('LOWER(subject.name) = LOWER(:subjectName)', { subjectName })
      .andWhere('lesson.status = :status', { status: 'ACTIVE' })
      .orderBy('lesson.grade_level', 'ASC')
      .addOrderBy('lesson.lesson_number', 'ASC')
      .getMany();

    if (!lessons.length) {
      throw new NotFoundException(
        `No active lessons found for subject: ${subjectName}`,
      );
    }

    return lessons.map((lesson) => ({
      id: lesson.id,
      title: lesson.title,
      grade_level: lesson.grade_level,
      lesson_number: lesson.lesson_number,
      subject: {
        name: lesson.subject.name,
        khmer_name: lesson.subject.khmer_name,
      },
      status: lesson.status,
    }));
  }

  async findAllSimplified(
    subjectId?: number,
    gradeLevel?: number,
  ): Promise<any[]> {
    const queryBuilder = this.lessonRepository
      .createQueryBuilder('lesson')
      .leftJoin('lesson.subject', 'subject')
      .leftJoin('lesson.creator', 'creator')
      .addSelect('lesson.id', 'id')
      .addSelect('lesson.subjectId', 'subjectId')
      .addSelect('lesson.title', 'title')
      .addSelect('lesson.description', 'description')
      .addSelect('lesson.grade_level', 'grade_level')
      .addSelect('lesson.lesson_number', 'lesson_number')
      .addSelect('lesson.createdBy', 'createdBy')
      .addSelect('lesson.status', 'status')
      .addSelect('lesson.is_hidden', 'is_hidden')
      .addSelect('subject.name', 'subject_name_en')
      .addSelect('subject.khmer_name', 'subject_name_kh')
      .addSelect('creator.first_name', 'creator_first_name')
      .addSelect('creator.last_name', 'creator_last_name');

    if (subjectId) {
      queryBuilder.andWhere('lesson.subjectId = :subjectId', { subjectId });
    }

    if (gradeLevel) {
      queryBuilder.andWhere('lesson.grade_level = :gradeLevel', { gradeLevel });
    }

    const results: LessonRawResult[] = await queryBuilder.getRawMany();

    return results.map((result) => ({
      id: result.id,
      subjectId: result.subjectId,
      subject_name_en: result.subject_name_en,
      subject_name_kh: result.subject_name_kh,
      title: result.title,
      description: result.description,
      grade_level: result.grade_level,
      lesson_number: result.lesson_number,
      createdBy: result.createdBy,
      creator:
        result.creator_first_name && result.creator_last_name
          ? `${result.creator_first_name} ${result.creator_last_name}`
          : null,
      status: result.status,
      is_hidden: result.is_hidden,
    }));
  }
}
