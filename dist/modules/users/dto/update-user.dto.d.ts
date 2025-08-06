import { Gender } from 'src/entities/user.entity';
export declare class UpdateMyAccountDto {
    username?: string;
    first_name?: string;
    last_name?: string;
    email?: string;
    newPassword?: string;
    date_of_birth?: string;
    gender?: Gender;
    profile_picture?: string;
    phone?: string;
    teacher_number?: string;
    provinceId?: number;
    districtId?: number;
    communeId?: number;
    villageId?: number;
    nationality?: string;
}
