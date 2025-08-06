import { Gender } from '../../../entities/user.entity';
export declare class UserResponseDto {
    id: number;
    username: string;
    first_name: string;
    last_name: string;
    email: string;
    roleId: number;
    roleNameEn: string;
    roleNameKh: string;
    date_of_birth: Date;
    gender: Gender;
    is_active: boolean;
    phone?: string;
    nationality?: string;
    profile_picture?: string;
    created_at: Date;
    updated_at: Date;
    residence?: any;
    placeOfBirth?: any;
    teacher?: any;
}
