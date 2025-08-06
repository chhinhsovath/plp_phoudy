import { Teacher } from './teacher.entity';
import { SchoolPlace } from './school-place.entity';
import { Status } from './enums/status.enum';
export declare class School {
    schoolId: number;
    name: string;
    code: string;
    profile: string;
    status: Status;
    createdAt: Date;
    updatedAt: Date;
    teachers: Teacher[];
    place: SchoolPlace;
}
