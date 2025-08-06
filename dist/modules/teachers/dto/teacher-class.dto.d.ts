import { GradeLevelType } from '../../../entities/class.entity';
import { Status } from '../../../entities/enums/status.enum';
export declare class TeacherClassDto {
    classId: number;
    name: string;
    gradeLevel: GradeLevelType;
    section?: string;
    schoolId: number;
    teacherId: number;
    academicYear: string;
    maxStudents: number;
    status: Status;
    school: {
        name: string;
    };
}
