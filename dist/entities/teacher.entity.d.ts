import { User } from './user.entity';
import { School } from './school.entity';
import { Status } from './enums/status.enum';
export declare class Teacher {
    teacherId: number;
    userId: number;
    user: User;
    schoolId: number;
    school: School;
    hire_date: Date;
    isDirector: boolean;
    teacher_number: string;
    status: Status;
    created_at: Date;
    updated_at: Date;
}
