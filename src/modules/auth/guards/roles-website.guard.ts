import {
  Injectable,
  CanActivate,
  ExecutionContext,
  Logger,
  UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthService } from '../auth.service';

@Injectable()
export class RolesWebsiteGuard implements CanActivate {
  private readonly logger = new Logger(RolesWebsiteGuard.name);

  constructor(
    private reflector: Reflector,
    private authService: AuthService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ]);

    const websiteId = this.reflector.getAllAndOverride<number>('websiteId', [
      context.getHandler(),
      context.getClass(),
    ]);

    const websiteDomain = this.reflector.getAllAndOverride<string>(
      'websiteDomain',
      [context.getHandler(), context.getClass()],
    );

    const request = context.switchToHttp().getRequest();
    const { user } = request;

    if (!user) {
      this.logger.error('User object not found in request');
      throw new UnauthorizedException('User not authenticated');
    }

    // Check role permissions
    if (requiredRoles && requiredRoles.length > 0) {
      const hasRole = requiredRoles.some(
        (role) =>
          user.role?.nameEn === role ||
          user.roleId === role ||
          user.role === role,
      );

      if (!hasRole) {
        this.logger.warn(
          `User ${user.email} with role ${user.role} attempted to access resource requiring roles: ${requiredRoles.join(', ')}`,
        );
        throw new ForbiddenException('Insufficient role permissions');
      }
    }

    // Check website permissions
    if (websiteId || websiteDomain) {
      const userId = user.id;

      try {
        let hasWebsitePermission = false;

        if (websiteId) {
          hasWebsitePermission = await this.authService.hasWebsitePermission(
            userId,
            websiteId,
          );
        } else if (websiteDomain) {
          hasWebsitePermission =
            await this.authService.hasWebsitePermissionByDomain(
              userId,
              websiteDomain,
            );
        }

        if (!hasWebsitePermission) {
          this.logger.warn(
            `User ${user.email} attempted to access website ${websiteId || websiteDomain} without permission`,
          );
          throw new ForbiddenException('Access denied to this website');
        }
      } catch (error) {
        this.logger.error('Error checking website permissions:', error);
        throw new ForbiddenException('Unable to verify website permissions');
      }
    }

    return true;
  }
}
