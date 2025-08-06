import { Repository } from 'typeorm';
import { SubSubject } from '../../entities/sub-subject.entity';
import { CreateSubSubjectDto } from './dto/create-sub-subject.dto';
import { UpdateSubSubjectDto } from './dto/update-sub-subject.dto';
export declare class SubSubjectsService {
    private readonly subSubjectRepository;
    constructor(subSubjectRepository: Repository<SubSubject>);
    create(createSubSubjectDto: CreateSubSubjectDto): Promise<any>;
    findAll(): Promise<any[]>;
    findOne(id: number): Promise<any>;
    findBySubject(subjectId: number): Promise<any[]>;
    findByStatus(status: string): Promise<any[]>;
    update(id: number, updateSubSubjectDto: UpdateSubSubjectDto): Promise<any>;
    remove(id: number): Promise<void>;
    private formatSubSubjectResponse;
}
