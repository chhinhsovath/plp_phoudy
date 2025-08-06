import { Repository } from 'typeorm';
import { ExaminationCategory } from '../../entities/examination-category.entity';
import { CreateExaminationCategoryDto } from './dto/create-examination-category.dto';
import { UpdateExaminationCategoryDto } from './dto/update-examination-category.dto';
export declare class ExaminationCategoriesService {
    private readonly examinationCategoryRepository;
    constructor(examinationCategoryRepository: Repository<ExaminationCategory>);
    create(createExaminationCategoryDto: CreateExaminationCategoryDto): Promise<any>;
    findAll(): Promise<any[]>;
    findOne(id: number): Promise<any>;
    findBySubject(subjectId: number): Promise<any[]>;
    findBySubSubject(subSubjectId: number): Promise<any[]>;
    findByType(type: string): Promise<any[]>;
    update(id: number, updateExaminationCategoryDto: UpdateExaminationCategoryDto): Promise<any>;
    remove(id: number): Promise<void>;
    private formatExaminationCategoryResponse;
}
