import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SubjectGrade } from '../../entities/subject-grade.entity';
import { Subject } from '../../entities/subject.entity';
import { CreateSubjectGradeDto } from './dto/create-subject-grade.dto';
import { UpdateSubjectGradeDto } from './dto/update-subject-grade.dto';

@Injectable()
export class SubjectGradesService {
  constructor(
    @InjectRepository(SubjectGrade)
    private subjectGradeRepository: Repository<SubjectGrade>,
    @InjectRepository(Subject)
    private subjectRepository: Repository<Subject>,
  ) {}

  async findAll(): Promise<SubjectGrade[]> {
    return this.subjectGradeRepository.find({
      relations: ['subject'],
    });
  }

  async findByGradeLevel(gradeLevel: number): Promise<SubjectGrade[]> {
    return this.subjectGradeRepository.find({
      where: { grade_level: gradeLevel },
      relations: ['subject'],
    });
  }

  async findBySubjectId(subjectId: number): Promise<SubjectGrade[]> {
    return this.subjectGradeRepository.find({
      where: { subject_id: subjectId },
      relations: ['subject'],
    });
  }

  async findSubjectsByGradeLevel(gradeLevel: number): Promise<Subject[]> {
    const subjectGrades = await this.subjectGradeRepository.find({
      where: { grade_level: gradeLevel },
      relations: ['subject'],
    });
    return subjectGrades.map((sg) => sg.subject);
  }

  async findGradesBySubjectId(subjectId: number): Promise<number[]> {
    const subjectGrades = await this.subjectGradeRepository.find({
      where: { subject_id: subjectId },
    });
    return subjectGrades.map((sg) => sg.grade_level);
  }

  async findOne(id: number): Promise<SubjectGrade> {
    if (isNaN(id) || id <= 0) {
      throw new NotFoundException(`Invalid subject grade ID: ${id}`);
    }
    const subjectGrade = await this.subjectGradeRepository.findOne({
      where: { id },
      relations: ['subject'],
    });
    if (!subjectGrade) {
      throw new NotFoundException(`Subject grade with ID ${id} not found`);
    }
    return subjectGrade;
  }

  async create(
    createSubjectGradeDto: CreateSubjectGradeDto,
  ): Promise<SubjectGrade> {
    // Check if subject exists
    const subject = await this.subjectRepository.findOne({
      where: { id: createSubjectGradeDto.subject_id },
    });
    if (!subject) {
      throw new NotFoundException(
        `Subject with ID ${createSubjectGradeDto.subject_id} not found`,
      );
    }

    // Check if combination already exists
    const existing = await this.subjectGradeRepository.findOne({
      where: {
        subject_id: createSubjectGradeDto.subject_id,
        grade_level: createSubjectGradeDto.grade_level,
      },
    });
    if (existing) {
      throw new Error(`Subject grade combination already exists`);
    }

    const subjectGrade = this.subjectGradeRepository.create(
      createSubjectGradeDto,
    );
    return this.subjectGradeRepository.save(subjectGrade);
  }

  async update(
    id: number,
    updateSubjectGradeDto: UpdateSubjectGradeDto,
  ): Promise<SubjectGrade> {
    const subjectGrade = await this.findOne(id);

    if (updateSubjectGradeDto.subject_id) {
      const subject = await this.subjectRepository.findOne({
        where: { id: updateSubjectGradeDto.subject_id },
      });
      if (!subject) {
        throw new NotFoundException(
          `Subject with ID ${updateSubjectGradeDto.subject_id} not found`,
        );
      }
    }

    Object.assign(subjectGrade, updateSubjectGradeDto);
    return this.subjectGradeRepository.save(subjectGrade);
  }

  async remove(id: number): Promise<void> {
    const result = await this.subjectGradeRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Subject grade with ID ${id} not found`);
    }
  }

  async findAllSubjectsByGrades(): Promise<any[]> {
    const query = `
      SELECT 
        sg.grade_level,
        json_agg(
          json_build_object(
            'id', s.id,
            'name', s.name,
            'khmer_name', s.khmer_name,
            'status', s.status,
            'is_student', s.is_student,
            'path', s.path,
            'subject_type', s.subject_type
          ) ORDER BY s.name
        ) as subjects
      FROM subject_grades sg
      JOIN subjects s ON sg.subject_id = s.id
      WHERE s.status = 'ACTIVE'
      GROUP BY sg.grade_level
      ORDER BY sg.grade_level
    `;
    return this.subjectGradeRepository.query(query);
  }
}
