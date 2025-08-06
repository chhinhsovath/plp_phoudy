import { Status } from './enums/status.enum';
import { Lesson } from './lesson.entity';
export declare class LessonActivity {
    id: number;
    lessonId: number;
    lesson: Lesson;
    title: string;
    order_index: number;
    status: Status;
    questions: any[];
    created_at: Date;
    updated_at: Date;
}
