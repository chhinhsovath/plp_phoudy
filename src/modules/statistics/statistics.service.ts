import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Question } from '../../entities/question.entity';
import { Student } from '../../entities/student.entity';
import { Teacher } from '../../entities/teacher.entity';
import { School } from '../../entities/school.entity';

@Injectable()
export class StatisticsService {
  constructor(
    @InjectRepository(Question)
    private questionRepository: Repository<Question>,
    @InjectRepository(Student)
    private studentRepository: Repository<Student>,
    @InjectRepository(Teacher)
    private teacherRepository: Repository<Teacher>,
    @InjectRepository(School)
    private schoolRepository: Repository<School>,
  ) {}

  async getOverallStatistics() {
    // Get current totals
    const [totalQuestions, totalStudents, totalTeachers, totalSchools] =
      await Promise.all([
        this.questionRepository.count(),
        this.studentRepository.count(),
        this.teacherRepository.count(),
        this.schoolRepository.count(),
      ]);

    // Calculate previous month totals for trend calculation
    const currentMonth = new Date();
    currentMonth.setDate(1);
    currentMonth.setHours(0, 0, 0, 0);

    const previousMonth = new Date(currentMonth);
    previousMonth.setMonth(previousMonth.getMonth() - 1);

    const [
      currentMonthQuestions,
      currentMonthStudents,
      currentMonthTeachers,
      currentMonthSchools,
    ] = await Promise.all([
      this.questionRepository
        .createQueryBuilder('question')
        .where('question.createdAt >= :start', { start: currentMonth })
        .getCount(),
      this.studentRepository
        .createQueryBuilder('student')
        .where('student.created_at >= :start', { start: currentMonth })
        .getCount(),
      this.teacherRepository
        .createQueryBuilder('teacher')
        .where('teacher.created_at >= :start', { start: currentMonth })
        .getCount(),
      this.schoolRepository
        .createQueryBuilder('school')
        .where('school.createdAt >= :start', { start: currentMonth })
        .getCount(),
    ]);

    const [prevQuestions, prevStudents, prevTeachers, prevSchools] =
      await Promise.all([
        this.questionRepository
          .createQueryBuilder('question')
          .where('question.createdAt >= :start AND question.createdAt < :end', {
            start: previousMonth,
            end: currentMonth,
          })
          .getCount(),
        this.studentRepository
          .createQueryBuilder('student')
          .where('student.created_at >= :start AND student.created_at < :end', {
            start: previousMonth,
            end: currentMonth,
          })
          .getCount(),
        this.teacherRepository
          .createQueryBuilder('teacher')
          .where('teacher.created_at >= :start AND teacher.created_at < :end', {
            start: previousMonth,
            end: currentMonth,
          })
          .getCount(),
        this.schoolRepository
          .createQueryBuilder('school')
          .where('school.createdAt >= :start AND school.createdAt < :end', {
            start: previousMonth,
            end: currentMonth,
          })
          .getCount(),
      ]);

    // Calculate trends (percentage growth)
    const calculateTrend = (current: number, previous: number) => {
      if (previous === 0) return current > 0 ? 100 : 0;
      return Math.round(((current - previous) / previous) * 100);
    };

    return {
      totalQuestions,
      totalStudents,
      totalTeachers,
      totalSchools,
      trends: {
        questions: calculateTrend(currentMonthQuestions, prevQuestions),
        students: calculateTrend(currentMonthStudents, prevStudents),
        teachers: calculateTrend(currentMonthTeachers, prevTeachers),
        schools: calculateTrend(currentMonthSchools, prevSchools),
      },
    };
  }

  async getChartStatistics() {
    // Get monthly data for the last 6 months
    const months: { date: Date; khmerName: string }[] = [];
    const khmerMonths = [
      'មករា',
      'កុម្ភៈ',
      'មីនា',
      'មេសា',
      'ឧសភា',
      'មិថុនា',
      'កក្កដា',
      'សីហា',
      'កញ្ញា',
      'តុលា',
      'វិច្ឆិកា',
      'ធ្នូ',
    ];

    // Generate last 6 months
    for (let i = 5; i >= 0; i--) {
      const date = new Date();
      date.setMonth(date.getMonth() - i);
      months.push({
        date: new Date(date.getFullYear(), date.getMonth(), 1),
        khmerName: khmerMonths[date.getMonth()],
      });
    }

    // Get monthly counts for each entity
    const monthlyData = await Promise.all(
      months.map(async (month) => {
        const nextMonth = new Date(month.date);
        nextMonth.setMonth(nextMonth.getMonth() + 1);

        const [questions, students, teachers, schools] = await Promise.all([
          this.questionRepository
            .createQueryBuilder('question')
            .where(
              'question.createdAt >= :start AND question.createdAt < :end',
              {
                start: month.date,
                end: nextMonth,
              },
            )
            .getCount(),
          this.studentRepository
            .createQueryBuilder('student')
            .where(
              'student.created_at >= :start AND student.created_at < :end',
              {
                start: month.date,
                end: nextMonth,
              },
            )
            .getCount(),
          this.teacherRepository
            .createQueryBuilder('teacher')
            .where(
              'teacher.created_at >= :start AND teacher.created_at < :end',
              {
                start: month.date,
                end: nextMonth,
              },
            )
            .getCount(),
          this.schoolRepository
            .createQueryBuilder('school')
            .where('school.createdAt >= :start AND school.createdAt < :end', {
              start: month.date,
              end: nextMonth,
            })
            .getCount(),
        ]);

        return { questions, students, teachers, schools };
      }),
    );

    // Transform data for chart format
    const monthlyStats = {
      សំណួរ: monthlyData.map((data) => data.questions),
      សិស្ស: monthlyData.map((data) => data.students),
      គ្រូ: monthlyData.map((data) => data.teachers),
      សាលា: monthlyData.map((data) => data.schools),
    };

    const categories = months.map((month) => month.khmerName);

    return {
      monthlyStats,
      categories,
    };
  }
}
