import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SubSubject } from '../../entities/sub-subject.entity';
import { CreateSubSubjectDto } from './dto/create-sub-subject.dto';
import { UpdateSubSubjectDto } from './dto/update-sub-subject.dto';

@Injectable()
export class SubSubjectsService {
  constructor(
    @InjectRepository(SubSubject)
    private readonly subSubjectRepository: Repository<SubSubject>,
  ) {}

  async create(createSubSubjectDto: CreateSubSubjectDto): Promise<any> {
    const subSubject = this.subSubjectRepository.create(createSubSubjectDto);
    const saved = await this.subSubjectRepository.save(subSubject);

    const subSubjectWithSubject = await this.subSubjectRepository.findOne({
      where: { id: saved.id },
      relations: ['subject'],
    });

    if (!subSubjectWithSubject) {
      throw new NotFoundException(
        `Sub subject with ID ${saved.id} not found after creation`,
      );
    }

    return this.formatSubSubjectResponse(subSubjectWithSubject);
  }

  async findAll(): Promise<any[]> {
    const subSubjects = await this.subSubjectRepository.find({
      relations: ['subject'],
      order: { created_at: 'DESC' },
    });

    return subSubjects.map((subSubject) =>
      this.formatSubSubjectResponse(subSubject),
    );
  }

  async findOne(id: number): Promise<any> {
    const subSubject = await this.subSubjectRepository.findOne({
      where: { id },
      relations: ['subject'],
    });

    if (!subSubject) {
      throw new NotFoundException(`Sub subject with ID ${id} not found`);
    }

    return this.formatSubSubjectResponse(subSubject);
  }

  async findBySubject(subjectId: number): Promise<any[]> {
    const subSubjects = await this.subSubjectRepository.find({
      where: { subjectId },
      relations: ['subject'],
      order: { created_at: 'DESC' },
    });

    return subSubjects.map((subSubject) =>
      this.formatSubSubjectResponse(subSubject),
    );
  }

  async findByStatus(status: string): Promise<any[]> {
    const subSubjects = await this.subSubjectRepository.find({
      where: { status },
      relations: ['subject'],
      order: { created_at: 'DESC' },
    });

    return subSubjects.map((subSubject) =>
      this.formatSubSubjectResponse(subSubject),
    );
  }

  async update(
    id: number,
    updateSubSubjectDto: UpdateSubSubjectDto,
  ): Promise<any> {
    const subSubject = await this.subSubjectRepository.findOne({
      where: { id },
      relations: ['subject'],
    });

    if (!subSubject) {
      throw new NotFoundException(`Sub subject with ID ${id} not found`);
    }

    Object.assign(subSubject, updateSubSubjectDto);
    const saved = await this.subSubjectRepository.save(subSubject);

    const updatedSubSubject = await this.subSubjectRepository.findOne({
      where: { id: saved.id },
      relations: ['subject'],
    });

    if (!updatedSubSubject) {
      throw new NotFoundException(
        `Sub subject with ID ${saved.id} not found after update`,
      );
    }

    return this.formatSubSubjectResponse(updatedSubSubject);
  }

  async remove(id: number): Promise<void> {
    const subSubject = await this.subSubjectRepository.findOne({
      where: { id },
    });

    if (!subSubject) {
      throw new NotFoundException(`Sub subject with ID ${id} not found`);
    }

    await this.subSubjectRepository.remove(subSubject);
  }

  private formatSubSubjectResponse(subSubject: SubSubject): any {
    return {
      id: subSubject.id,
      created_at: subSubject.created_at,
      updated_at: subSubject.updated_at,
      subjectId: subSubject.subjectId,
      subjectNameEn: subSubject.subject?.name || null,
      subjectNameKh: subSubject.subject?.khmer_name || null,
      name: subSubject.name,
      khmerName: subSubject.khmerName,
      description: subSubject.description,
      status: subSubject.status,
      path: subSubject.path,
    };
  }
}
