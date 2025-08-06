export declare class QuestionResponseDto {
    question_id: number;
    introduction: string;
    question_text: string;
    difficulty_level: string;
    question_grade_level: string;
    lesson_id: string;
    lesson_title: string;
    lesson_number: number;
    lesson_activities_id: number;
    activity_title: string;
    subject_id: number;
    is_correct: boolean;
    time_spent: number;
    streak_count: number;
}
export declare class StudentInfoDto {
    student_id: number;
    student_user_id: number;
    student_username: string;
    student_first_name: string;
    student_last_name: string;
    total_average_score: number;
    total_time_spent: number;
    responses: QuestionResponseDto[];
}
export declare class ClassAnalysisResponseDto {
    class_id: number;
    class_grade_level: string;
    teacher_id: number;
    teacher_username: string;
    teacher_first_name: string;
    teacher_last_name: string;
    grade_level?: string;
    subject_id?: number;
    lesson_numbers?: number[];
    students: StudentInfoDto[];
}
export declare class StudentHistoryDto {
    student_id: number;
    student_user_id: number;
    student_username: string;
    student_first_name: string;
    student_last_name: string;
    question_id: number;
    introduction: string;
    question_text: string;
    difficulty_level: string;
    question_grade_level: string;
    lesson_id: string;
    lesson_title: string;
    lesson_number: number;
    lesson_activities_id: number;
    activity_title: string;
    subject_id: number;
    is_correct: boolean;
    time_spent: number;
    streak_count: number;
}
