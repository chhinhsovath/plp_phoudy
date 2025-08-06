import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthService } from '../auth.service';
export declare class WebsitePermissionsGuard implements CanActivate {
    private reflector;
    private authService;
    private readonly logger;
    constructor(reflector: Reflector, authService: AuthService);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
