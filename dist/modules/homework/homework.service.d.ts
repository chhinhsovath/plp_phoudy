import { Homework } from 'src/entities/homework.entity';
import { Repository } from 'typeorm';
import { CreateHomeworkDto } from './dto/homework.dto';
import { SearchHomeworkDto } from './dto/searchHomework.dto';
import { SubmissionFile } from 'src/entities/submission-files.entity';
type HomeworkWithSubmission = Homework & {
    submitted: boolean;
    submittedAt: Date | null;
};
export declare class HomeworkService {
    private readonly homeworkRepo;
    private readonly submissionFileRepo;
    constructor(homeworkRepo: Repository<Homework>, submissionFileRepo: Repository<SubmissionFile>);
    create(data: CreateHomeworkDto): Promise<Homework>;
    findAll(): Promise<HomeworkWithSubmission[]>;
    findOne(id: number): Promise<Homework>;
    update(id: number, data: CreateHomeworkDto): Promise<Homework>;
    findByTeacherId(teacherId: number): Promise<Homework[]>;
    findByClassId(classId: number): Promise<Homework[]>;
    findBySubjectId(subjectId: number): Promise<Homework[]>;
    findByLessonId(lessonId: number): Promise<Homework[]>;
    search(filter: SearchHomeworkDto): Promise<{
        data: HomeworkWithSubmission[];
        totalItems: number;
        page: number;
        limit: number;
        totalPages: number;
    }>;
    getHomeworkCountsActiveByTeacher(teacherId?: number, classId?: number): Promise<{
        total: number;
        overdue: number;
        upcoming: number;
        draft: number;
        withSubmission: number;
    }>;
    softDelete(id: number): Promise<void>;
    hardDelete(id: number): Promise<void>;
}
export {};
