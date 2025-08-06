import { Lesson } from './lesson.entity';
export declare class Exercise {
    id: string;
    lessonId: number;
    lesson: Lesson;
    title: string;
    grade_level: string;
    created_at: Date;
    studentExercises: any[];
}
