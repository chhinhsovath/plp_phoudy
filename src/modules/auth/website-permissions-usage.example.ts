/**
 * Website Role Permissions Usage Examples
 *
 * This file demonstrates how to use the website permissions system in your controllers.
 */

import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { WebsitePermissionsGuard } from './guards/website-permissions.guard';
import { RolesWebsiteGuard } from './guards/roles-website.guard';
import { RolesGuard } from './guards/roles.guard';
import { Roles } from './decorators/roles.decorator';
import {
  RequireWebsiteId,
  RequireWebsiteDomain,
  RequireWebsiteAccess,
} from './decorators/website-permissions.decorator';

@Controller('example')
export class ExampleController {
  /**
   * Example 1: Check if user has permission for a specific website by ID
   */
  @Get('admin-panel')
  @UseGuards(JwtAuthGuard, WebsitePermissionsGuard)
  @RequireWebsiteId(1) // User must have permission for website with ID 1
  getAdminPanel() {
    return { message: 'Admin panel accessed' };
  }

  /**
   * Example 2: Check if user has permission for a website by domain
   */
  @Get('dashboard')
  @UseGuards(JwtAuthGuard, WebsitePermissionsGuard)
  @RequireWebsiteDomain('admin.example.com') // User must have permission for this domain
  getDashboard() {
    return { message: 'Dashboard accessed' };
  }

  /**
   * Example 3: Check both role and website permissions
   */
  @Get('teacher-resources')
  @UseGuards(JwtAuthGuard, RolesWebsiteGuard)
  @Roles('TEACHER', 'ADMIN') // User must have TEACHER or ADMIN role
  @RequireWebsiteId(2) // AND must have permission for website with ID 2
  getTeacherResources() {
    return { message: 'Teacher resources accessed' };
  }

  /**
   * Example 4: Only role check (no website permission required)
   */
  @Get('admin-only')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  getAdminOnly() {
    return { message: 'Admin only content' };
  }

  /**
   * Example 5: Flexible website access (accepts both ID and domain)
   */
  @Get('flexible-access')
  @UseGuards(JwtAuthGuard, WebsitePermissionsGuard)
  @RequireWebsiteAccess('portal.example.com') // Can use string (domain) or number (ID)
  getFlexibleAccess() {
    return { message: 'Flexible access granted' };
  }

  /**
   * Example 6: Multiple role and website combinations
   */
  @Get('complex-permissions')
  @UseGuards(JwtAuthGuard, RolesWebsiteGuard)
  @Roles('TEACHER', 'ADMIN', 'OFFICER') // Multiple roles allowed
  @RequireWebsiteDomain('school.example.com') // Must have access to this domain
  getComplexPermissions() {
    return { message: 'Complex permissions validated' };
  }
}

/**
 * Database Setup Instructions:
 *
 * 1. Create roles in the roles table:
 *    INSERT INTO roles (name_en, name_kh, description) VALUES
 *    ('ADMIN', 'អ្នកគ្រប់គ្រង', 'Administrator role'),
 *    ('TEACHER', 'គ្រូបង្រៀន', 'Teacher role'),
 *    ('STUDENT', 'សិស្ស', 'Student role'),
 *    ('OFFICER', 'មន្ត្រី', 'Officer role');
 *
 * 2. Create websites in the websites table:
 *    INSERT INTO websites (name, domain, description, is_active) VALUES
 *    ('Admin Portal', 'admin.example.com', 'Main admin portal', true),
 *    ('Teacher Portal', 'teacher.example.com', 'Teacher resources', true),
 *    ('School Portal', 'school.example.com', 'School management', true);
 *
 * 3. Grant permissions in the website_role_permissions table:
 *    INSERT INTO website_role_permissions (website_id, role_id) VALUES
 *    (1, 1), -- Admin can access Admin Portal
 *    (2, 1), -- Admin can access Teacher Portal
 *    (2, 2), -- Teacher can access Teacher Portal
 *    (3, 1), -- Admin can access School Portal
 *    (3, 2), -- Teacher can access School Portal
 *    (3, 4); -- Officer can access School Portal
 *
 * 4. Create users with appropriate role_id references in the users table.
 */

/**
 * API Endpoints for Testing:
 *
 * GET /auth/my-website-permissions
 * - Returns all websites the current user has permission to access
 *
 * GET /auth/check-website-permission/:websiteId
 * - Check if user has permission for specific website ID
 *
 * GET /auth/check-website-permission-by-domain/:domain
 * - Check if user has permission for website by domain
 *
 * Usage with curl:
 * curl -H "Authorization: Bearer YOUR_JWT_TOKEN" \
 *      http://localhost:3000/api/v1/auth/my-website-permissions
 */
