import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  UseGuards,
  Patch,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiQuery,
} from '@nestjs/swagger';
import { WebsitesService } from './websites.service';
import { Website } from '../../entities/website.entity';
import { WebsiteRolePermission } from '../../entities/website-role-permission.entity';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { CreateWebsiteDto } from './dto/create-website.dto';
import { UpdateWebsiteDto } from './dto/update-website.dto';
import { AssignRolePermissionDto } from './dto/assign-role-permission.dto';
import { PaginationResult } from '../../common/pagination.interface';

@ApiTags('Websites')
@Controller('websites')
@UseGuards(JwtAuthGuard, RolesGuard)
export class WebsitesController {
  constructor(private readonly websitesService: WebsitesService) {}

  @Get()
  @ApiOperation({ summary: 'Get all websites with pagination' })
  @ApiResponse({ status: 200, description: 'Return paginated websites' })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: Number,
    description: 'Number of items per page',
  })
  @ApiQuery({
    name: 'offset',
    required: false,
    type: Number,
    description: 'Number of items to skip',
  })
  @ApiBearerAuth()
  async findAll(
    @Query('limit') limit?: number,
    @Query('offset') offset?: number,
  ): Promise<PaginationResult<Website>> {
    return this.websitesService.findAll(limit, offset);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a website by ID' })
  @ApiResponse({ status: 200, description: 'Return the website' })
  @ApiResponse({ status: 404, description: 'Website not found' })
  @ApiBearerAuth()
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Website> {
    return this.websitesService.findOne(id);
  }

  @Post()
  @Roles('ADMIN')
  @ApiOperation({ summary: 'Create a new website' })
  @ApiResponse({ status: 201, description: 'Website successfully created' })
  @ApiBearerAuth()
  async create(@Body() createWebsiteDto: CreateWebsiteDto): Promise<Website> {
    return this.websitesService.create(createWebsiteDto);
  }

  @Put(':id')
  @Roles('ADMIN')
  @ApiOperation({ summary: 'Update a website' })
  @ApiResponse({ status: 200, description: 'Website successfully updated' })
  @ApiResponse({ status: 404, description: 'Website not found' })
  @ApiBearerAuth()
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateWebsiteDto: UpdateWebsiteDto,
  ): Promise<Website> {
    return this.websitesService.update(id, updateWebsiteDto);
  }

  @Delete(':id')
  @Roles('ADMIN')
  @ApiOperation({ summary: 'Delete a website' })
  @ApiResponse({ status: 200, description: 'Website successfully deleted' })
  @ApiResponse({ status: 404, description: 'Website not found' })
  @ApiBearerAuth()
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.websitesService.remove(id);
  }

  @Patch(':id/activate')
  @Roles('ADMIN')
  @ApiOperation({ summary: 'Activate a website' })
  @ApiResponse({ status: 200, description: 'Website successfully activated' })
  @ApiResponse({ status: 404, description: 'Website not found' })
  @ApiBearerAuth()
  async activate(@Param('id', ParseIntPipe) id: number): Promise<Website> {
    return this.websitesService.activate(id);
  }

  @Patch(':id/deactivate')
  @Roles('ADMIN')
  @ApiOperation({ summary: 'Deactivate a website' })
  @ApiResponse({ status: 200, description: 'Website successfully deactivated' })
  @ApiResponse({ status: 404, description: 'Website not found' })
  @ApiBearerAuth()
  async deactivate(@Param('id', ParseIntPipe) id: number): Promise<Website> {
    return this.websitesService.deactivate(id);
  }

  @Post(':id/permissions')
  @Roles('ADMIN')
  @ApiOperation({ summary: 'Assign role permission to website' })
  @ApiResponse({
    status: 201,
    description: 'Role permission assigned successfully',
  })
  @ApiResponse({ status: 404, description: 'Website not found' })
  @ApiBearerAuth()
  async assignRolePermission(
    @Param('id', ParseIntPipe) id: number,
    @Body() assignRolePermissionDto: AssignRolePermissionDto,
  ): Promise<void> {
    return this.websitesService.assignRolePermission(
      id,
      assignRolePermissionDto.roleId,
    );
  }

  @Delete(':id/permissions/:roleId')
  @Roles('ADMIN')
  @ApiOperation({ summary: 'Remove role permission from website' })
  @ApiResponse({
    status: 200,
    description: 'Role permission removed successfully',
  })
  @ApiResponse({ status: 404, description: 'Permission not found' })
  @ApiBearerAuth()
  async removeRolePermission(
    @Param('id', ParseIntPipe) id: number,
    @Param('roleId', ParseIntPipe) roleId: number,
  ): Promise<void> {
    return this.websitesService.removeRolePermission(id, roleId);
  }

  @Get(':id/permissions')
  @Roles('ADMIN')
  @ApiOperation({ summary: 'Get website permissions' })
  @ApiResponse({ status: 200, description: 'Return website permissions' })
  @ApiResponse({ status: 404, description: 'Website not found' })
  @ApiBearerAuth()
  async getWebsitePermissions(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<WebsiteRolePermission[]> {
    return this.websitesService.getWebsitePermissions(id);
  }
}
