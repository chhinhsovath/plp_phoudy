import { School } from './school.entity';
import { Teacher } from './teacher.entity';
import { Status } from './enums/status.enum';
export declare enum GradeLevelType {
    GRADE_1 = "1",
    GRADE_2 = "2",
    GRADE_3 = "3",
    GRADE_4 = "4",
    GRADE_5 = "5",
    GRADE_6 = "6"
}
export declare class Class {
    classId: number;
    name: string;
    gradeLevel: GradeLevelType;
    section: string;
    schoolId: number;
    school: School;
    teacherId: number;
    teacher: Teacher;
    academicYear: string;
    maxStudents: number;
    status: Status;
    created_at: Date;
    updated_at: Date;
}
