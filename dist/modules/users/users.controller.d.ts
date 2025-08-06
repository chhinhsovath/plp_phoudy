import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from '../../entities/user.entity';
import { Request } from 'express';
import { UpdateMyAccountDto } from './dto/update-user.dto';
import { LoginQrDto } from './dto/user-qrcode.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    create(createUserDto: CreateUserDto): Promise<User>;
    createTeacher(createUserDto: CreateUserDto): Promise<User>;
    findAll(page?: number, limit?: number): Promise<any>;
    findByStatusAndRole(status?: string, roleId?: number, page?: number, limit?: number): Promise<any>;
    getMyAccountWithAddress(req: Request): Promise<any>;
    getMyAccount(req: Request): Promise<any>;
    updateMyAccount(req: Request, updateData: UpdateMyAccountDto): Promise<any>;
    updateProfilePicture(req: any, file: Express.Multer.File): Promise<any>;
    generateLoginQR(credentials: LoginQrDto): Promise<{
        qrCode: string;
    }>;
    uploadProfile(id: number, file: Express.Multer.File): Promise<{
        profile_picture: string;
    }>;
    findOne(id: number): Promise<any>;
    update(id: number, updateData: Partial<User>): Promise<User>;
    remove(id: number): Promise<void>;
}
