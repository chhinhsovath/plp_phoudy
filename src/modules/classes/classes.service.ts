import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Class, GradeLevelType } from '../../entities/class.entity';
import { CreateClassDto } from './dto/create-class.dto';
import { UpdateClassDto } from './dto/update-class.dto';
import { ClassStudentDto } from './dto/class-student.dto';

@Injectable()
export class ClassesService {
  private readonly logger = new Logger(ClassesService.name);

  constructor(
    @InjectRepository(Class)
    private classRepository: Repository<Class>,
  ) {}

  async create(createClassDto: CreateClassDto): Promise<Class> {
    this.logger.log('Creating new class');
    const newClass = this.classRepository.create(createClassDto);
    return await this.classRepository.save(newClass);
  }

  async findAll(): Promise<Class[]> {
    this.logger.log('Finding all classes');
    return await this.classRepository.find();
  }

  async findByGradeLevel(gradeLevel: GradeLevelType): Promise<Class[]> {
    this.logger.log(`Finding classes with grade level: ${gradeLevel}`);
    return await this.classRepository.find({
      where: { gradeLevel: gradeLevel },
    });
  }

  async findOne(id: number): Promise<Class> {
    this.logger.log(`Finding class with id: ${id}`);
    const classEntity = await this.classRepository.findOne({
      where: { classId: id },
    });
    if (!classEntity) {
      throw new NotFoundException(`Class with ID ${id} not found`);
    }
    return classEntity;
  }

  async update(id: number, updateClassDto: UpdateClassDto): Promise<Class> {
    this.logger.log(`Updating class with id: ${id}`);
    const classEntity = await this.findOne(id);
    Object.assign(classEntity, updateClassDto);
    return await this.classRepository.save(classEntity);
  }

  async remove(id: number): Promise<void> {
    this.logger.log(`Removing class with id: ${id}`);
    const classEntity = await this.findOne(id);
    await this.classRepository.remove(classEntity);
  }

  async findStudentsByClassId(classId: number): Promise<ClassStudentDto[]> {
    this.logger.log(`Finding students for class ID: ${classId}`);

    // Check if class exists first
    await this.findOne(classId);

    // Use raw query to get students with their user details
    const query = `
      SELECT
        c.class_id,
        c.grade_level AS class_grade_level,
        s.student_id,
        u.id AS user_id,
        u.username,
        u.first_name,
        u.last_name
      FROM
        classes AS c
      JOIN
        students AS s ON c.class_id = s.class_id
      JOIN
        users AS u ON s.user_id = u.id
      WHERE
        c.class_id = $1
      ORDER BY
        u.first_name, u.last_name
    `;

    const results = await this.classRepository.query(query, [classId]);

    if (!results || results.length === 0) {
      return []; // Return empty array if no students found
    }

    return results;
  }

  async findStudentsInfoByClassId(classId: number) {
    this.logger.log(`Finding detailed student info for class ID: ${classId}`);

    // Check if class exists first
    await this.findOne(classId);

    // Use raw query to get students with detailed information
    const query = `
      SELECT
        c.class_id,
        c.grade_level AS class_grade_level,
        c.name AS class_name,
        s.student_id,
        u.id AS user_id,
        u.username,
        u.first_name,
        u.last_name,
        u.email,
        u.phone,
        u.password_hash,
        u.profile_picture,
        u.created_at AS user_created_at,
        u.updated_at AS user_updated_at,
        s.created_at AS student_created_at,
        s.updated_at AS student_updated_at
      FROM
        classes AS c
      JOIN
        students AS s ON c.class_id = s.class_id
      JOIN
        users AS u ON s.user_id = u.id
      WHERE
        c.class_id = $1
      ORDER BY
        u.first_name, u.last_name
    `;

    const results = await this.classRepository.query(query, [classId]);

    if (!results || results.length === 0) {
      return {
        class_id: classId,
        students: [],
        total_students: 0,
      };
    }

    return {
      class_id: classId,
      class_name: results[0].class_name,
      class_grade_level: results[0].class_grade_level,
      students: results,
      total_students: results.length,
    };
  }
}
