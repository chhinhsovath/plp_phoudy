import {
  Injectable,
  CanActivate,
  ExecutionContext,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  private readonly logger = new Logger(RolesGuard.name);

  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest();

    if (!user) {
      this.logger.error('User object not found in request');
      throw new UnauthorizedException('User not authenticated');
    }

    this.logger.debug(
      `User role: ${user.role?.nameEn || user.roleId}, Required roles: ${requiredRoles.join(', ')}`,
    );

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
    }

    return hasRole;
  }
}
