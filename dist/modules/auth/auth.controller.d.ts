import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { AuthResponseDto } from './dto/auth-response.dto';
import { Request } from 'express';
import { Website } from '../../entities/website.entity';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    login(loginDto: LoginDto): Promise<AuthResponseDto>;
    getMyWebsitePermissions(req: Request): Promise<Website[]>;
    checkWebsitePermission(req: Request, websiteId: number): Promise<{
        hasPermission: boolean;
    }>;
    checkWebsitePermissionByDomain(req: Request, domain: string): Promise<{
        hasPermission: boolean;
    }>;
}
