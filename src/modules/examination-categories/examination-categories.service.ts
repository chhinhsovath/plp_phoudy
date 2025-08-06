import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ExaminationCategory } from '../../entities/examination-category.entity';
import { CreateExaminationCategoryDto } from './dto/create-examination-category.dto';
import { UpdateExaminationCategoryDto } from './dto/update-examination-category.dto';

@Injectable()
export class ExaminationCategoriesService {
  constructor(
    @InjectRepository(ExaminationCategory)
    private readonly examinationCategoryRepository: Repository<ExaminationCategory>,
  ) {}

  async create(
    createExaminationCategoryDto: CreateExaminationCategoryDto,
  ): Promise<any> {
    const examinationCategory = this.examinationCategoryRepository.create(
      createExaminationCategoryDto,
    );
    const saved =
      await this.examinationCategoryRepository.save(examinationCategory);

    const categoryWithRelations =
      await this.examinationCategoryRepository.findOne({
        where: { id: saved.id },
        relations: ['subject', 'subSubject', 'subSubject.subject'],
      });

    if (!categoryWithRelations) {
      throw new NotFoundException(
        `Examination category with ID ${saved.id} not found after creation`,
      );
    }

    return this.formatExaminationCategoryResponse(categoryWithRelations);
  }

  async findAll(): Promise<any[]> {
    const categories = await this.examinationCategoryRepository.find({
      relations: ['subject', 'subSubject', 'subSubject.subject'],
      order: { created_at: 'DESC' },
    });

    return categories.map((category) =>
      this.formatExaminationCategoryResponse(category),
    );
  }

  async findOne(id: number): Promise<any> {
    const examinationCategory =
      await this.examinationCategoryRepository.findOne({
        where: { id },
        relations: ['subject', 'subSubject', 'subSubject.subject'],
      });

    if (!examinationCategory) {
      throw new NotFoundException(
        `Examination category with ID ${id} not found`,
      );
    }

    return this.formatExaminationCategoryResponse(examinationCategory);
  }

  async findBySubject(subjectId: number): Promise<any[]> {
    const categories = await this.examinationCategoryRepository.find({
      where: { subjectId },
      relations: ['subject', 'subSubject', 'subSubject.subject'],
      order: { created_at: 'DESC' },
    });

    return categories.map((category) =>
      this.formatExaminationCategoryResponse(category),
    );
  }

  async findBySubSubject(subSubjectId: number): Promise<any[]> {
    const categories = await this.examinationCategoryRepository.find({
      where: { subSubjectId },
      relations: ['subject', 'subSubject', 'subSubject.subject'],
      order: { created_at: 'DESC' },
    });

    return categories.map((category) =>
      this.formatExaminationCategoryResponse(category),
    );
  }

  async findByType(type: string): Promise<any[]> {
    const categories = await this.examinationCategoryRepository.find({
      where: { type: type as any },
      relations: ['subject', 'subSubject', 'subSubject.subject'],
      order: { created_at: 'DESC' },
    });

    return categories.map((category) =>
      this.formatExaminationCategoryResponse(category),
    );
  }

  async update(
    id: number,
    updateExaminationCategoryDto: UpdateExaminationCategoryDto,
  ): Promise<any> {
    const examinationCategory =
      await this.examinationCategoryRepository.findOne({
        where: { id },
        relations: ['subject', 'subSubject', 'subSubject.subject'],
      });

    if (!examinationCategory) {
      throw new NotFoundException(
        `Examination category with ID ${id} not found`,
      );
    }

    Object.assign(examinationCategory, updateExaminationCategoryDto);
    const saved =
      await this.examinationCategoryRepository.save(examinationCategory);

    const updatedCategory = await this.examinationCategoryRepository.findOne({
      where: { id: saved.id },
      relations: ['subject', 'subSubject', 'subSubject.subject'],
    });

    if (!updatedCategory) {
      throw new NotFoundException(
        `Examination category with ID ${saved.id} not found after update`,
      );
    }

    return this.formatExaminationCategoryResponse(updatedCategory);
  }

  async remove(id: number): Promise<void> {
    const examinationCategory =
      await this.examinationCategoryRepository.findOne({
        where: { id },
      });

    if (!examinationCategory) {
      throw new NotFoundException(
        `Examination category with ID ${id} not found`,
      );
    }

    await this.examinationCategoryRepository.remove(examinationCategory);
  }

  private formatExaminationCategoryResponse(
    category: ExaminationCategory,
  ): any {
    return {
      id: category.id,
      created_at: category.created_at,
      updated_at: category.updated_at,
      title: category.title,
      subjectId: category.subjectId,
      subjectNameEn: category.subject?.name || null,
      subjectNameKh: category.subject?.khmer_name || null,
      subSubjectId: category.subSubjectId,
      subSubjectName: category.subSubject?.name || null,
      subSubjectKhmerName: category.subSubject?.khmerName || null,
      subSubjectParentSubjectId: category.subSubject?.subjectId || null,
      subSubjectParentNameEn: category.subSubject?.subject?.name || null,
      subSubjectParentNameKh: category.subSubject?.subject?.khmer_name || null,
      grade: category.grade,
      type: category.type,
      status: category.status,
      certificateFile: category.certificateFile,
    };
  }
}
