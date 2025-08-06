import { Teacher } from './teacher.entity';
import { Role } from './role.entity';
import { UserResidence } from './user-residence.entity';
import { UserPob } from './user-pob.entity';
export declare enum Gender {
    MALE = "MALE",
    FEMALE = "FEMALE"
}
export declare class User {
    id: number;
    username: string;
    first_name: string;
    last_name: string;
    email: string;
    password_hash: string;
    role: Role;
    roleId: number;
    date_of_birth: Date;
    gender: Gender;
    phone: string;
    profile_picture: string;
    nationality: string;
    is_active: boolean;
    is_hidden: boolean;
    last_login: Date;
    teacher: Teacher;
    residence: UserResidence;
    placeOfBirth: UserPob;
    created_at: Date;
    updated_at: Date;
}
