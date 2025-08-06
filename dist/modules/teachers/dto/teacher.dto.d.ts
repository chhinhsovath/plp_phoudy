import { Status } from '../../../entities/enums/status.enum';
export declare class TeacherDto {
    teacherId: number;
    userId: number;
    schoolId: number;
    hire_date?: Date;
    isDirector: boolean;
    status: Status;
    user: {
        username: string;
        first_name: string;
        last_name: string;
    };
    school: {
        name: string;
    };
}
