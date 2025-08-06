import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Teacher } from '../../entities/teacher.entity';
import { Class } from '../../entities/class.entity';
import { TeacherDto } from './dto/teacher.dto';
import { TeacherClassDto } from './dto/teacher-class.dto';

@Injectable()
export class TeachersService {
  private readonly logger = new Logger(TeachersService.name);

  constructor(
    @InjectRepository(Teacher)
    private teacherRepository: Repository<Teacher>,
    @InjectRepository(Class)
    private classRepository: Repository<Class>,
  ) {}

  async findOne(id: number): Promise<TeacherDto> {
    this.logger.log(`Finding teacher with id: ${id}`);

    const teacher = await this.teacherRepository.findOne({
      where: { teacherId: id },
      relations: ['user', 'school'],
    });

    if (!teacher) {
      throw new NotFoundException(`Teacher with ID ${id} not found`);
    }

    return {
      teacherId: teacher.teacherId,
      userId: teacher.userId,
      schoolId: teacher.schoolId,
      hire_date: teacher.hire_date,
      isDirector: teacher.isDirector,
      status: teacher.status,
      user: {
        username: teacher.user.username,
        first_name: teacher.user.first_name,
        last_name: teacher.user.last_name,
      },
      school: {
        name: teacher.school.name,
      },
    };
  }

  async findByUserId(userId: number): Promise<TeacherDto> {
    this.logger.log(`Finding teacher by user ID: ${userId}`);

    const teacher = await this.teacherRepository.findOne({
      where: { userId },
      relations: ['user', 'school'],
    });

    if (!teacher) {
      throw new NotFoundException(`Teacher not found for user ID ${userId}`);
    }

    return {
      teacherId: teacher.teacherId,
      userId: teacher.userId,
      schoolId: teacher.schoolId,
      hire_date: teacher.hire_date,
      isDirector: teacher.isDirector,
      status: teacher.status,
      user: {
        username: teacher.user.username,
        first_name: teacher.user.first_name,
        last_name: teacher.user.last_name,
      },
      school: {
        name: teacher.school.name,
      },
    };
  }

  async findClassesByTeacherId(teacherId: number): Promise<TeacherClassDto[]> {
    this.logger.log(`Finding classes for teacher ID: ${teacherId}`);

    // First verify the teacher exists
    const teacher = await this.teacherRepository.findOne({
      where: { teacherId },
    });

    if (!teacher) {
      throw new NotFoundException(`Teacher with ID ${teacherId} not found`);
    }

    // Find all classes for this teacher
    const classes = await this.classRepository.find({
      where: { teacherId },
      relations: ['school'],
      order: { gradeLevel: 'ASC', name: 'ASC' },
    });

    return classes.map((classEntity) => ({
      classId: classEntity.classId,
      name: classEntity.name,
      gradeLevel: classEntity.gradeLevel,
      section: classEntity.section,
      schoolId: classEntity.schoolId,
      teacherId: classEntity.teacherId,
      academicYear: classEntity.academicYear,
      maxStudents: classEntity.maxStudents,
      status: classEntity.status,
      school: {
        name: classEntity.school.name,
      },
    }));
  }

  async findAll(): Promise<TeacherDto[]> {
    this.logger.log('Finding all teachers');

    const teachers = await this.teacherRepository.find({
      relations: ['user', 'school'],
      order: { created_at: 'DESC' },
    });

    return teachers.map((teacher) => ({
      teacherId: teacher.teacherId,
      userId: teacher.userId,
      schoolId: teacher.schoolId,
      hire_date: teacher.hire_date,
      isDirector: teacher.isDirector,
      status: teacher.status,
      user: {
        username: teacher.user.username,
        first_name: teacher.user.first_name,
        last_name: teacher.user.last_name,
      },
      school: {
        name: teacher.school.name,
      },
    }));
  }
}
