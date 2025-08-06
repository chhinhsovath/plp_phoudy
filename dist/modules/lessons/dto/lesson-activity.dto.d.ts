import { Status } from '../../../entities/enums/status.enum';
export declare class LessonActivityDto {
    id: number;
    lessonId: number;
    title: string;
    orderIndex: number;
    status: Status;
    createdAt: Date;
    updatedAt: Date;
}
