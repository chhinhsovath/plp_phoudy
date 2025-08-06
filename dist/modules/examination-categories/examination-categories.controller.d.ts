import { ExaminationCategoriesService } from './examination-categories.service';
import { CreateExaminationCategoryDto } from './dto/create-examination-category.dto';
import { UpdateExaminationCategoryDto } from './dto/update-examination-category.dto';
export declare class ExaminationCategoriesController {
    private readonly examinationCategoriesService;
    constructor(examinationCategoriesService: ExaminationCategoriesService);
    create(createExaminationCategoryDto: CreateExaminationCategoryDto): Promise<any>;
    findAll(): Promise<any[]>;
    findBySubject(subjectId: string): Promise<any[]>;
    findBySubSubject(subSubjectId: string): Promise<any[]>;
    findByType(type: string): Promise<any[]>;
    findOne(id: string): Promise<any>;
    update(id: string, updateExaminationCategoryDto: UpdateExaminationCategoryDto): Promise<any>;
    remove(id: string): Promise<void>;
}
