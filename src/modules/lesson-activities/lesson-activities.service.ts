import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LessonActivity } from '../../entities/lesson-activity.entity';
import { CreateLessonActivityDto } from './dto/create-lesson-activity.dto';
import { UpdateLessonActivityDto } from './dto/update-lesson-activity.dto';

interface LessonActivityRawResult {
  id: number;
  lessonId: number;
  title: string;
  order_index: number;
  status: string;
  created_at: Date;
  updated_at: Date;
  lesson_title: string;
  grade_level: number;
  lesson_number: number;
  subjectId: number;
  subject_name_en: string;
  subject_name_kh: string;
  creator_first_name: string;
  creator_last_name: string;
}

@Injectable()
export class LessonActivitiesService {
  constructor(
    @InjectRepository(LessonActivity)
    private lessonActivityRepository: Repository<LessonActivity>,
  ) {}

  async findAll(): Promise<any[]> {
    const results: LessonActivityRawResult[] =
      await this.lessonActivityRepository
        .createQueryBuilder('lessonActivity')
        .leftJoin('lessonActivity.lesson', 'lesson')
        .leftJoin('lesson.subject', 'subject')
        .leftJoin('lesson.creator', 'creator')
        .addSelect('lessonActivity.id', 'id')
        .addSelect('lessonActivity.lessonId', 'lessonId')
        .addSelect('lessonActivity.title', 'title')
        .addSelect('lessonActivity.order_index', 'order_index')
        .addSelect('lessonActivity.status', 'status')
        .addSelect('lessonActivity.created_at', 'created_at')
        .addSelect('lessonActivity.updated_at', 'updated_at')
        .addSelect('lesson.title', 'lesson_title')
        .addSelect('lesson.grade_level', 'grade_level')
        .addSelect('lesson.lesson_number', 'lesson_number')
        .addSelect('lesson.subjectId', 'subjectId')
        .addSelect('subject.name', 'subject_name_en')
        .addSelect('subject.khmer_name', 'subject_name_kh')
        .addSelect('creator.first_name', 'creator_first_name')
        .addSelect('creator.last_name', 'creator_last_name')
        .getRawMany();

    return results.map((result) => ({
      id: result.id.toString(),
      lessonId: result.lessonId,
      title: result.title,
      order_index: result.order_index,
      status: result.status,
      created_at: result.created_at,
      updated_at: result.updated_at,
      lesson_title: result.lesson_title,
      grade_level: result.grade_level ? result.grade_level.toString() : null,
      lesson_number: result.lesson_number,
      subjectId: result.subjectId ? result.subjectId.toString() : null,
      subject_name_en: result.subject_name_en,
      subject_name_kh: result.subject_name_kh,
      creator:
        result.creator_first_name && result.creator_last_name
          ? `${result.creator_first_name} ${result.creator_last_name}`
          : null,
    }));
  }

  async findByGradeLevelAndSubjectId(
    gradeLevel: number,
    subjectId: number,
  ): Promise<any[]> {
    const results: LessonActivityRawResult[] =
      await this.lessonActivityRepository
        .createQueryBuilder('lessonActivity')
        .leftJoin('lessonActivity.lesson', 'lesson')
        .leftJoin('lesson.subject', 'subject')
        .leftJoin('lesson.creator', 'creator')
        .addSelect('lessonActivity.id', 'id')
        .addSelect('lessonActivity.lessonId', 'lessonId')
        .addSelect('lessonActivity.title', 'title')
        .addSelect('lessonActivity.order_index', 'order_index')
        .addSelect('lessonActivity.status', 'status')
        .addSelect('lessonActivity.created_at', 'created_at')
        .addSelect('lessonActivity.updated_at', 'updated_at')
        .addSelect('lesson.title', 'lesson_title')
        .addSelect('lesson.grade_level', 'grade_level')
        .addSelect('lesson.lesson_number', 'lesson_number')
        .addSelect('lesson.subjectId', 'subjectId')
        .addSelect('subject.name', 'subject_name_en')
        .addSelect('subject.khmer_name', 'subject_name_kh')
        .addSelect('creator.first_name', 'creator_first_name')
        .addSelect('creator.last_name', 'creator_last_name')
        .where('lesson.grade_level = :gradeLevel', { gradeLevel })
        .andWhere('lesson.subjectId = :subjectId', { subjectId })
        .getRawMany();

    return results.map((result) => ({
      id: result.id.toString(),
      lessonId: result.lessonId,
      title: result.title,
      order_index: result.order_index,
      status: result.status,
      created_at: result.created_at,
      updated_at: result.updated_at,
      lesson_title: result.lesson_title,
      grade_level: result.grade_level ? result.grade_level.toString() : null,
      lesson_number: result.lesson_number,
      subjectId: result.subjectId ? result.subjectId.toString() : null,
      subject_name_en: result.subject_name_en,
      subject_name_kh: result.subject_name_kh,
      creator:
        result.creator_first_name && result.creator_last_name
          ? `${result.creator_first_name} ${result.creator_last_name}`
          : null,
    }));
  }

  async create(
    createLessonActivityDto: CreateLessonActivityDto,
  ): Promise<LessonActivity> {
    const lessonActivity = this.lessonActivityRepository.create(
      createLessonActivityDto,
    );
    return this.lessonActivityRepository.save(lessonActivity);
  }

  async findById(id: number): Promise<LessonActivity> {
    const lessonActivity = await this.lessonActivityRepository.findOne({
      where: { id },
    });
    if (!lessonActivity) {
      throw new NotFoundException(`Lesson activity with ID ${id} not found`);
    }
    return lessonActivity;
  }

  async update(
    id: number,
    updateLessonActivityDto: UpdateLessonActivityDto,
  ): Promise<LessonActivity> {
    const lessonActivity = await this.findById(id);
    Object.assign(lessonActivity, updateLessonActivityDto);
    return this.lessonActivityRepository.save(lessonActivity);
  }
}
