import { Status } from '../../../entities/enums/status.enum';
export declare class UpdateLessonActivityDto {
    title?: string;
    lessonId?: number;
    order_index?: number;
    status?: Status;
}
