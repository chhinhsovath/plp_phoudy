import { GradeLevelType } from '../../../entities/class.entity';
export declare class CreateClassDto {
    name: string;
    gradeLevel: GradeLevelType;
    section?: string;
    schoolId: number;
    teacherId: number;
    academicYear: string;
    maxStudents?: number;
}
