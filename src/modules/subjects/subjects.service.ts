import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Subject } from '../../entities/subject.entity';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { UpdateSubjectDto } from './dto/update-subject.dto';
import { Status } from '../../entities/enums/status.enum';
import { SubjectType } from '../../entities/subject.entity';
import { SubjectContentDto } from './dto/subject-content.dto';

@Injectable()
export class SubjectsService {
  constructor(
    @InjectRepository(Subject)
    private subjectRepository: Repository<Subject>,
  ) {}

  async findAll(): Promise<Subject[]> {
    return this.subjectRepository.find();
  }

  async findActive(): Promise<Subject[]> {
    return this.subjectRepository
      .createQueryBuilder('subject')
      .where('subject.status = :status', { status: Status.ACTIVE })
      .getMany();
  }

  async findStudentSubjects(): Promise<Subject[]> {
    return this.subjectRepository
      .createQueryBuilder('subject')
      .where('subject.is_student = :isStudent', { isStudent: true })
      .andWhere('subject.status = :status', { status: Status.ACTIVE })
      .getMany();
  }

  async findByGradeLevel(gradeLevel: number): Promise<Subject[]> {
    return this.subjectRepository
      .createQueryBuilder('subject')
      .innerJoin('subject_grades', 'sg', 'subject.id = sg.subject_id')
      .where('sg.grade_level = :gradeLevel', { gradeLevel })
      .andWhere('subject.status = :status', { status: Status.ACTIVE })
      .getMany();
  }

  async findActiveByGradeLevel(gradeLevel: number): Promise<Subject[]> {
    return this.subjectRepository
      .createQueryBuilder('subject')
      .innerJoin('subject_grades', 'sg', 'subject.id = sg.subject_id')
      .where('sg.grade_level = :gradeLevel', { gradeLevel })
      .andWhere('subject.status = :status', { status: Status.ACTIVE })
      .getMany();
  }

  async findOne(id: number): Promise<Subject> {
    if (isNaN(id) || id <= 0) {
      throw new NotFoundException(`Invalid subject ID: ${id}`);
    }
    const subject = await this.subjectRepository.findOne({ where: { id } });
    if (!subject) {
      throw new NotFoundException(`Subject with ID ${id} not found`);
    }
    return subject;
  }

  async findByPath(path: string): Promise<Subject> {
    const subject = await this.subjectRepository
      .createQueryBuilder('subject')
      .where('subject.path = :path', { path })
      .getOne();

    if (!subject) {
      throw new NotFoundException(`Subject with path ${path} not found`);
    }
    return subject;
  }

  async findSpecialSubjects(): Promise<Subject[]> {
    return this.subjectRepository
      .createQueryBuilder('subject')
      .where('subject.subject_type = :type', { type: SubjectType.SPECIAL })
      .andWhere('subject.status = :status', { status: Status.ACTIVE })
      .getMany();
  }

  findSubjectContent(): SubjectContentDto[] {
    // Placeholder - implement when SubjectContent entity available
    return [];
  }

  async create(createSubjectDto: CreateSubjectDto): Promise<Subject> {
    const subject = new Subject();
    subject.name = createSubjectDto.name;
    if (createSubjectDto.khmer_name !== undefined)
      subject.khmer_name = createSubjectDto.khmer_name;
    if (createSubjectDto.description !== undefined)
      subject.description = createSubjectDto.description;
    if (createSubjectDto.is_student !== undefined)
      subject.is_student = createSubjectDto.is_student;
    if (createSubjectDto.path !== undefined)
      subject.path = createSubjectDto.path;
    if (createSubjectDto.subject_type !== undefined)
      subject.subject_type = createSubjectDto.subject_type;
    subject.status = createSubjectDto.status || Status.ACTIVE;
    return this.subjectRepository.save(subject);
  }

  async update(
    id: number,
    updateSubjectDto: UpdateSubjectDto,
  ): Promise<Subject> {
    const subject = await this.findOne(id);
    if (updateSubjectDto.name !== undefined)
      subject.name = updateSubjectDto.name;
    if (updateSubjectDto.khmer_name !== undefined)
      subject.khmer_name = updateSubjectDto.khmer_name;
    if (updateSubjectDto.description !== undefined)
      subject.description = updateSubjectDto.description;
    if (updateSubjectDto.status !== undefined)
      subject.status = updateSubjectDto.status;
    if (updateSubjectDto.is_student !== undefined)
      subject.is_student = updateSubjectDto.is_student;
    if (updateSubjectDto.path !== undefined)
      subject.path = updateSubjectDto.path;
    if (updateSubjectDto.subject_type !== undefined)
      subject.subject_type = updateSubjectDto.subject_type;
    return this.subjectRepository.save(subject);
  }

  async remove(id: number): Promise<void> {
    const result = await this.subjectRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Subject with ID ${id} not found`);
    }
  }

  async activate(id: number): Promise<Subject> {
    const subject = await this.findOne(id);
    subject.status = Status.ACTIVE;
    return this.subjectRepository.save(subject);
  }

  async deactivate(id: number): Promise<Subject> {
    const subject = await this.findOne(id);
    subject.status = Status.INACTIVE;
    return this.subjectRepository.save(subject);
  }

  async findNormalSubjects(): Promise<Subject[]> {
    return this.subjectRepository
      .createQueryBuilder('subject')
      .where('subject.subject_type = :type', { type: SubjectType.NORMAL })
      .andWhere('subject.status = :status', { status: Status.ACTIVE })
      .getMany();
  }

  async findAllGradesWithSubjects(): Promise<any[]> {
    const query = `
      SELECT 
        sg.grade_level,
        json_agg(
          json_build_object(
            'id', s.id,
            'name', s.name,
            'khmer_name', s.khmer_name,
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
    return this.subjectRepository.query(query);
  }

  async findGradesBySubjectId(subjectId: number): Promise<any[]> {
    if (isNaN(subjectId) || subjectId <= 0) {
      throw new NotFoundException(`Invalid subject ID: ${subjectId}`);
    }

    const subject = await this.subjectRepository.findOne({
      where: { id: subjectId },
    });
    if (!subject) {
      throw new NotFoundException(`Subject with ID ${subjectId} not found`);
    }

    const query = `
      SELECT 
        sg.grade_level
      FROM subject_grades sg
      WHERE sg.subject_id = $1
      ORDER BY sg.grade_level
    `;
    return this.subjectRepository.query(query, [subjectId]);
  }

  async findActiveForDropdown() {
    return this.subjectRepository
      .createQueryBuilder('subject')
      .select(['subject.name', 'subject.khmer_name', 'subject.path'])
      .where('subject.status = :status', { status: Status.ACTIVE })
      .orderBy('subject.name', 'ASC')
      .getMany();
  }
}
