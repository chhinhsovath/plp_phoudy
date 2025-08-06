import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Class } from '../../entities/class.entity';
import { Student } from '../../entities/student.entity';
import { UserResponse } from '../../entities/user-response.entity';
import { User } from '../../entities/user.entity';
import { Teacher } from '../../entities/teacher.entity';
import { Question } from '../../entities/question.entity';
import { Lesson } from '../../entities/lesson.entity';
import { LessonActivity } from '../../entities/lesson-activity.entity';
import { ClassAnalysisDto } from './dto/class-analysis.dto';
import {
  ClassAnalysisResponseDto,
  StudentInfoDto,
  QuestionResponseDto,
} from './dto/class-analysis-response.dto';

@Injectable()
export class AnalysisService {
  private readonly logger = new Logger(AnalysisService.name);

  constructor(
    @InjectRepository(Class)
    private classRepository: Repository<Class>,
    @InjectRepository(Student)
    private studentRepository: Repository<Student>,
    @InjectRepository(UserResponse)
    private userResponseRepository: Repository<UserResponse>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Teacher)
    private teacherRepository: Repository<Teacher>,
    @InjectRepository(Question)
    private questionRepository: Repository<Question>,
    @InjectRepository(Lesson)
    private lessonRepository: Repository<Lesson>,
    @InjectRepository(LessonActivity)
    private lessonActivityRepository: Repository<LessonActivity>,
  ) {}

  async getClassAnalysis(
    classId: number,
    studentId?: number,
    gradeLevel?: string,
    subjectId?: number,
    lessonNumbers?: number[],
  ): Promise<ClassAnalysisResponseDto> {
    this.logger.log(
      `Getting class analysis data for class ID: ${classId} with filters: ${JSON.stringify(
        {
          studentId,
          gradeLevel,
          subjectId,
          lessonNumbers,
        },
      )}`,
    );

    try {
      // Build query using TypeORM query builder
      let query = this.classRepository
        .createQueryBuilder('c')
        .leftJoinAndSelect('c.teacher', 't')
        .leftJoinAndSelect('t.user', 't_user')
        .leftJoinAndSelect('c.school', 'school')
        .leftJoin('students', 's', 's.class_id = c.class_id')
        .leftJoin('users', 's_user', 's.user_id = s_user.id')
        .leftJoin('user_responses', 'ur', 's_user.id = ur.user_id')
        .leftJoin('questions', 'q', 'ur.question_id = q.id')
        .leftJoin('lesson_activities', 'la', 'q.lesson_activities_id = la.id')
        .leftJoin('lessons', 'l', 'la.lesson_id = l.id')
        .select([
          'c.class_id as class_id',
          'c.grade_level as class_grade_level',
          'c.teacher_id as teacher_id',
          't_user.username as teacher_username',
          't_user.first_name as teacher_first_name',
          't_user.last_name as teacher_last_name',
          's.student_id as student_id',
          's_user.id as student_user_id',
          's_user.username as student_username',
          's_user.first_name as student_first_name',
          's_user.last_name as student_last_name',
          'ur.question_id as question_id',
          'q.introduction as introduction',
          'q.question_text as question_text',
          'q.difficulty_level as difficulty_level',
          'l.grade_level as question_grade_level',
          'l.id as lesson_id',
          'l.title as lesson_title',
          'l.lesson_number as lesson_number',
          'la.id as lesson_activities_id',
          'la.title as activity_title',
          'l.subject_id as subject_id',
          'ur.is_correct as is_correct',
          'ur.time_spent as time_spent',
          'ur.streak_count as streak_count',
        ])
        .where('c.class_id = :classId', { classId });

      // Apply filters
      if (studentId) {
        query = query.andWhere('s.student_id = :studentId', { studentId });
      }

      if (gradeLevel) {
        query = query.andWhere('l.grade_level = :gradeLevel', { gradeLevel });
      }

      if (subjectId) {
        query = query.andWhere('l.subject_id = :subjectId', { subjectId });
      }

      if (lessonNumbers && lessonNumbers.length > 0) {
        query = query.andWhere('l.lesson_number IN (:...lessonNumbers)', {
          lessonNumbers,
        });
      }

      query = query
        .orderBy('s.student_id', 'ASC')
        .addOrderBy('ur.created_at', 'DESC');

      // Execute the query
      const results: ClassAnalysisDto[] = await query.getRawMany();

      if (!results || results.length === 0) {
        throw new NotFoundException(
          `No analysis data found for class ID: ${classId} with the provided filters`,
        );
      }

      // Transform data into the desired format
      return this.transformClassAnalysisData(
        results,
        gradeLevel,
        subjectId,
        lessonNumbers,
      );
    } catch (error) {
      this.logger.error(
        `Error getting class analysis: ${error.message}`,
        error.stack,
      );
      throw error;
    }
  }

  private transformClassAnalysisData(
    results: ClassAnalysisDto[],
    gradeLevel?: string,
    subjectId?: number,
    lessonNumbers?: number[],
  ): ClassAnalysisResponseDto {
    if (!results || results.length === 0) {
      throw new Error('No data to transform');
    }

    // Extract class information from the first result
    const firstResult = results[0];

    // Create the response object with class information
    const responseDto: ClassAnalysisResponseDto = {
      class_id: parseInt(firstResult.class_id as any),
      class_grade_level: firstResult.class_grade_level,
      teacher_id: parseInt(firstResult.teacher_id as any),
      teacher_username: firstResult.teacher_username,
      teacher_first_name: firstResult.teacher_first_name,
      teacher_last_name: firstResult.teacher_last_name,
      students: [],
    };

    // Add the filter information if they were provided
    if (gradeLevel) {
      responseDto.grade_level = gradeLevel;
    }

    if (subjectId) {
      responseDto.subject_id = subjectId;
    }

    if (lessonNumbers && lessonNumbers.length > 0) {
      responseDto.lesson_numbers = lessonNumbers;
    }

    // Group data by student
    const studentMap = new Map<number, StudentInfoDto>();

    results.forEach((record) => {
      const student_id = parseInt(record.student_id as any);

      // Create or get the student object
      if (!studentMap.has(student_id)) {
        studentMap.set(student_id, {
          student_id,
          student_user_id: parseInt(record.student_user_id as any),
          student_username: record.student_username,
          student_first_name: record.student_first_name,
          student_last_name: record.student_last_name,
          total_average_score: 0, // Initial value, will be calculated later
          total_time_spent: 0, // Initial value, will be calculated later
          responses: [],
        });
      }

      // Get the student and add the question response
      const student = studentMap.get(student_id);

      // Create question response
      const questionResponse: QuestionResponseDto = {
        question_id: parseInt(record.question_id as any),
        introduction: record.introduction,
        question_text: record.question_text,
        difficulty_level: record.difficulty_level,
        question_grade_level: record.question_grade_level,
        lesson_id: record.lesson_id,
        lesson_title: record.lesson_title,
        lesson_number: record.lesson_number,
        lesson_activities_id: parseInt(record.lesson_activities_id as any),
        activity_title: record.activity_title,
        subject_id: parseInt(record.subject_id as any),
        is_correct: record.is_correct,
        time_spent: record.time_spent,
        streak_count: record.streak_count,
      };

      // Add the response to the student's responses array if student exists
      if (student) {
        student.responses.push(questionResponse);
      }
    });

    // Calculate totals for each student
    studentMap.forEach((student) => {
      // Calculate total time spent
      student.total_time_spent = student.responses.reduce(
        (sum, response) => sum + response.time_spent,
        0,
      );

      // Calculate average score (percentage of correct answers)
      const correctAnswers = student.responses.filter(
        (response) => response.is_correct,
      ).length;
      student.total_average_score =
        student.responses.length > 0
          ? Math.round((correctAnswers / student.responses.length) * 100)
          : 0;
    });

    // Convert the student map to an array
    responseDto.students = Array.from(studentMap.values());

    return responseDto;
  }
}
