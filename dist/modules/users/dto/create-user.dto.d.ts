import { Gender } from '../../../entities/user.entity';
import { UserResidenceDto } from './user-residence.dto';
import { UserPobDto } from './user-pob.dto';
export declare class CreateUserDto {
    username: string;
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    roleId: number;
    date_of_birth: Date;
    gender: Gender;
    phone?: string;
    profile_picture?: string;
    nationality?: string;
    residence?: UserResidenceDto;
    placeOfBirth?: UserPobDto;
}
