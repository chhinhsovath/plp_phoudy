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
export class WebsitePermissionsGuard implements CanActivate {
  private readonly logger = new Logger(WebsitePermissionsGuard.name);

  constructor(
    private reflector: Reflector,
    private authService: AuthService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const websiteId = this.reflector.getAllAndOverride<number>('websiteId', [
      context.getHandler(),
      context.getClass(),
    ]);

    const websiteDomain = this.reflector.getAllAndOverride<string>(
      'websiteDomain',
      [context.getHandler(), context.getClass()],
    );

    // If no website requirement is specified, allow access
    if (!websiteId && !websiteDomain) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const { user } = request;

    if (!user) {
      this.logger.error('User object not found in request');
      throw new UnauthorizedException('User not authenticated');
    }

    const userId = user.id;

    try {
      let hasPermission = false;

      if (websiteId) {
        hasPermission = await this.authService.hasWebsitePermission(
          userId,
          websiteId,
        );
      } else if (websiteDomain) {
        hasPermission = await this.authService.hasWebsitePermissionByDomain(
          userId,
          websiteDomain,
        );
      }

      if (!hasPermission) {
        this.logger.warn(
          `User ${user.email} attempted to access website ${websiteId || websiteDomain} without permission`,
        );
        throw new ForbiddenException('Access denied to this website');
      }

      return true;
    } catch (error) {
      this.logger.error('Error checking website permissions:', error);
      throw new ForbiddenException('Unable to verify website permissions');
    }
  }
}
