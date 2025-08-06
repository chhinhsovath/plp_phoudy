import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Question } from '../../entities/question.entity';
import { Student } from '../../entities/student.entity';
import { Teacher } from '../../entities/teacher.entity';
import { UserResponse } from '../../entities/user-response.entity';
import { QuestionStatisticsDTO } from './dto/question-statistics.dto';
import { StudentDto } from './dto/student.dto';

@Injectable()
export class StudentsService {
  private readonly logger = new Logger(StudentsService.name);

  constructor(
    @InjectRepository(Student)
    private studentRepository: Repository<Student>,
    @InjectRepository(Teacher)
    private teacherRepository: Repository<Teacher>,
    @InjectRepository(UserResponse)
    private userResponseRepository: Repository<UserResponse>,
    @InjectRepository(Question)
    private questionRepository: Repository<Question>,
  ) {}

  private async getTeacherIdByUserId(userId: number): Promise<number> {
    const teacher = await this.teacherRepository.findOne({
      where: { userId },
    });

    if (!teacher) {
      throw new NotFoundException(`Teacher not found for user ID ${userId}`);
    }

    return teacher.teacherId;
  }

  private async calculateStudentStats(studentId: number): Promise<{
    scores: any[];
    problemPoints: any[];
    averageScore: number;
    timeSpent: number;
  }> {
    // Get all user responses with their questions and subjects
    const student = await this.studentRepository.findOne({
      where: { studentId },
    });

    if (!student) {
      throw new NotFoundException(`Student not found with ID ${studentId}`);
    }

    const responses = await this.userResponseRepository
      .createQueryBuilder('response')
      .leftJoinAndSelect('response.question', 'question')
      .leftJoinAndSelect('question.subject', 'subject')
      .where('response.userId = :userId', { userId: student.userId })
      .orderBy('response.createdAt', 'DESC')
      .getMany();

    if (!responses.length) {
      return {
        scores: [],
        problemPoints: [],
        averageScore: 0,
        timeSpent: 0,
      };
    }

    // Calculate total time spent and average score
    const totalTimeSpent = responses.reduce(
      (sum, response) => sum + response.timeSpent,
      0,
    );
    const totalScoreImpact = responses.reduce(
      (sum, response) => sum + response.scoreImpact,
      0,
    );
    const averageScore =
      responses.length > 0 ? totalScoreImpact / responses.length : 0;

    // Group responses by subject and date for scores
    const scoreMap = new Map();
    for (const response of responses) {
      const date = response.createdAt.toISOString().split('T')[0];
      const subject = response.question?.questionType?.label || 'UNKNOWN';
      const grade = 'ថ្នាក់ទី១'; // Default grade since grade_level is no longer available

      const key = `${date}-${subject}`;
      if (!scoreMap.has(key)) {
        scoreMap.set(key, {
          date: response.createdAt.toISOString(),
          value: response.scoreImpact,
          subject,
          grade,
          count: 1,
        });
      } else {
        const existing = scoreMap.get(key);
        existing.value =
          (existing.value * existing.count + response.scoreImpact) /
          (existing.count + 1);
        existing.count++;
      }
    }

    // Group responses by lesson for problem points
    const lessonMap = new Map();
    for (const response of responses) {
      const lesson = response.question?.lessonActivity?.title || 'មេរៀនទី១';
      if (!lessonMap.has(lesson)) {
        lessonMap.set(lesson, { lesson });
      }
    }

    return {
      scores: Array.from(scoreMap.values()).map(({ ...rest }) => rest),
      problemPoints: Array.from(lessonMap.values()),
      averageScore: Math.round(averageScore * 10) / 10,
      timeSpent: totalTimeSpent,
    };
  }

  async findByTeacherUserId(userId: number): Promise<StudentDto[]> {
    const teacherId = await this.getTeacherIdByUserId(userId);

    const students = await this.studentRepository
      .createQueryBuilder('student')
      .leftJoinAndSelect('student.user', 'user')
      .leftJoin('student.class', 'class')
      .leftJoin('class.teacher', 'teacher')
      .where('teacher.teacherId = :teacherId', { teacherId })
      .getMany();

    if (!students.length) {
      throw new NotFoundException(
        `No students found for teacher ID ${teacherId}`,
      );
    }

    // Transform and enrich the student data
    const enrichedStudents = await Promise.all(
      students.map(async (student) => {
        const stats = await this.calculateStudentStats(student.studentId);

        return {
          studentId: student.studentId,
          user: {
            username: student.user.username,
            first_name: student.user.first_name,
            last_name: student.user.last_name,
          },
          ...stats,
        };
      }),
    );

    return enrichedStudents;
  }

  async findOne(id: number): Promise<StudentDto> {
    const student = await this.studentRepository.findOne({
      where: { studentId: id },
      relations: ['user'],
    });

    if (!student) {
      throw new NotFoundException(`Student not found with ID ${id}`);
    }

    const stats = await this.calculateStudentStats(student.studentId);

    return {
      studentId: student.studentId,
      user: {
        username: student.user.username,
        first_name: student.user.first_name,
        last_name: student.user.last_name,
      },
      ...stats,
    };
  }

  async getQuestionsStatistics(
    grade?: string,
    subjectId?: number,
    lessonTitle?: string,
    lessonNumber?: number,
  ): Promise<QuestionStatisticsDTO[]> {
    try {
      const queryBuilder = this.questionRepository
        .createQueryBuilder('question')
        .leftJoinAndSelect('question.lesson', 'lesson')
        .leftJoinAndSelect('question.subject', 'subject')
        .leftJoin('user_responses', 'ur', 'ur.question_id = question.id')
        .select([
          'question.id',
          'question.question_text as question',
          'lesson.id',
          'lesson.title',
          'lesson.lesson_number',
          'subject.name as subject',
          'question.grade_level as grade',
          'COUNT(DISTINCT ur.user_id) as studentCompleted',
          'AVG(ur.score_impact) as averageScore',
          'SUM(CASE WHEN ur.is_correct = TRUE THEN 1 ELSE 0 END) as correct',
          'SUM(CASE WHEN ur.is_correct = FALSE THEN 1 ELSE 0 END) as incorrect',
        ])
        .groupBy('question.id')
        .addGroupBy('lesson.id')
        .addGroupBy('lesson.title')
        .addGroupBy('lesson.lesson_number')
        .addGroupBy('subject.name');

      if (grade) {
        queryBuilder.andWhere('question.grade_level = :grade', { grade });
      }

      if (subjectId) {
        queryBuilder.andWhere('subject.id = :subjectId', { subjectId });
      }

      if (lessonTitle) {
        queryBuilder.andWhere('lesson.title = :lessonTitle', { lessonTitle });
      }

      if (lessonNumber) {
        queryBuilder.andWhere('lesson.lesson_number = :lessonNumber', {
          lessonNumber,
        });
      }

      const questions = await queryBuilder.getRawMany();

      const questionStats = await Promise.all(
        questions.map(async (q) => {
          // Get performance history for each question
          const performance = await this.userResponseRepository
            .createQueryBuilder('ur')
            .where('ur.question_id = :questionId', { questionId: q.id })
            .select([
              'DATE(ur.created_at) as date',
              'AVG(ur.score_impact) as value',
              'SUM(CASE WHEN ur.is_correct = TRUE THEN 1 ELSE 0 END) as correct',
              'SUM(CASE WHEN ur.is_correct = FALSE THEN 1 ELSE 0 END) as incorrect',
            ])
            .groupBy('DATE(ur.created_at)')
            .orderBy('DATE(ur.created_at)', 'ASC')
            .getRawMany();

          return {
            id: q.id,
            question: q.question,
            averageScore: parseFloat(q.averageScore) || 0,
            studentCompleted: parseInt(q.studentCompleted),
            lesson: {
              id: q.lesson_id,
              title: q.title,
              lesson_number: q.lesson_number,
            },
            subject: q.subject,
            grade: q.grade,
            performance: performance.map((p) => ({
              date: p.date,
              correct: parseInt(p.correct) || 0,
              incorrect: parseInt(p.incorrect) || 0,
              value: parseFloat(p.value) || 0,
            })),
          };
        }),
      );

      return questionStats;
    } catch (error) {
      this.logger.error(
        `Error getting question statistics: ${error.message}`,
        error.stack,
      );
      throw error;
    }
  }
}
