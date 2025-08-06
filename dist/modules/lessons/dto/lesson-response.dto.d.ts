declare class SubjectDto {
    name: string;
    khmer_name: string;
}
export declare class LessonResponseDto {
    id: number;
    title: string;
    grade_level: number;
    lesson_number: number;
    subject: SubjectDto;
    status: string;
}
export {};
