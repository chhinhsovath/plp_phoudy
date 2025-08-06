import { SubSubjectsService } from './sub-subjects.service';
import { CreateSubSubjectDto } from './dto/create-sub-subject.dto';
import { UpdateSubSubjectDto } from './dto/update-sub-subject.dto';
export declare class SubSubjectsController {
    private readonly subSubjectsService;
    constructor(subSubjectsService: SubSubjectsService);
    create(createSubSubjectDto: CreateSubSubjectDto): Promise<any>;
    findAll(): Promise<any[]>;
    findBySubject(subjectId: string): Promise<any[]>;
    findByStatus(status: string): Promise<any[]>;
    findOne(id: string): Promise<any>;
    update(id: string, updateSubSubjectDto: UpdateSubSubjectDto): Promise<any>;
    remove(id: string): Promise<void>;
}
