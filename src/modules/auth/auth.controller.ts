import {
  Body,
  Controller,
  Post,
  Get,
  UseGuards,
  Req,
  Param,
} from '@nestjs/common';
import {
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { AuthResponseDto } from './dto/auth-response.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { Request } from 'express';
import { Website } from '../../entities/website.entity';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @ApiOperation({ summary: 'User login' })
  @ApiResponse({
    status: 200,
    description: 'Login successful',
    type: AuthResponseDto,
  })
  @ApiResponse({ status: 401, description: 'Invalid credentials' })
  async login(@Body() loginDto: LoginDto): Promise<AuthResponseDto> {
    return this.authService.login(loginDto);
  }

  @Get('my-website-permissions')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get current user website permissions' })
  @ApiResponse({ status: 200, description: 'Returns user website permissions' })
  async getMyWebsitePermissions(@Req() req: Request): Promise<Website[]> {
    const userId = req.user?.['id'];
    return this.authService.getUserWebsitePermissions(userId);
  }

  @Get('check-website-permission/:websiteId')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Check if user has permission for specific website',
  })
  @ApiResponse({
    status: 200,
    description: 'Returns whether user has permission',
  })
  async checkWebsitePermission(
    @Req() req: Request,
    @Param('websiteId') websiteId: number,
  ): Promise<{ hasPermission: boolean }> {
    const userId = req.user?.['id'];
    const hasPermission = await this.authService.hasWebsitePermission(
      userId,
      websiteId,
    );
    return { hasPermission };
  }

  @Get('check-website-permission-by-domain/:domain')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Check if user has permission for website by domain',
  })
  @ApiResponse({
    status: 200,
    description: 'Returns whether user has permission',
  })
  async checkWebsitePermissionByDomain(
    @Req() req: Request,
    @Param('domain') domain: string,
  ): Promise<{ hasPermission: boolean }> {
    const userId = req.user?.['id'];
    const hasPermission = await this.authService.hasWebsitePermissionByDomain(
      userId,
      domain,
    );
    return { hasPermission };
  }
}
