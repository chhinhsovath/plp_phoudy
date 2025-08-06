export declare class UserDto {
    id: number;
    username: string;
    first_name: string;
    last_name: string;
    email: string;
    roleId: number;
    gender: string;
    teacherId?: number;
    classIds?: number[];
    classNames?: string[];
    gradeLevels?: string[];
    roleEn: string;
    roleKh: string;
}
export declare class AuthResponseDto {
    accessToken: string;
    user: UserDto;
}
