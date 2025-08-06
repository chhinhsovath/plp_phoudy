import { CreateHomeworkDto } from './dto/homework.dto';
import { HomeworkService } from './homework.service';
import { SearchHomeworkDto } from './dto/searchHomework.dto';
export declare class HomeworkController {
    private readonly service;
    constructor(service: HomeworkService);
    create(files: Express.Multer.File[], dto: CreateHomeworkDto): Promise<import("../../entities/homework.entity").Homework>;
    findAll(): Promise<(import("../../entities/homework.entity").Homework & {
        submitted: boolean;
        submittedAt: Date | null;
    })[]>;
    search(searchDto: SearchHomeworkDto): Promise<{
        data: (import("../../entities/homework.entity").Homework & {
            submitted: boolean;
            submittedAt: Date | null;
        })[];
        totalItems: number;
        page: number;
        limit: number;
        totalPages: number;
    }>;
    getHomeworkCounts(teacherIdStr?: string, classIdStr?: string): Promise<{
        total: number;
        overdue: number;
        upcoming: number;
        draft: number;
        withSubmission: number;
    }>;
    findOne(id: number): Promise<import("../../entities/homework.entity").Homework>;
    update(id: string, newFiles: Express.Multer.File[], body: any): Promise<import("../../entities/homework.entity").Homework>;
    softDelete(id: string): Promise<{
        message: string;
    }>;
    hardDelete(id: string): Promise<{
        message: string;
    }>;
    findByTeacher(teacherId: string): Promise<import("../../entities/homework.entity").Homework[]>;
    findByClass(classId: string): Promise<import("../../entities/homework.entity").Homework[]>;
    findBySubject(subjectId: string): Promise<import("../../entities/homework.entity").Homework[]>;
    findByLesson(lessonId: string): Promise<import("../../entities/homework.entity").Homework[]>;
}
