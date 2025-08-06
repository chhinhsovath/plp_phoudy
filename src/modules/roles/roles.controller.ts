import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiQuery,
} from '@nestjs/swagger';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { RoleResponseDto } from './dto/role-response.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@ApiTags('Roles')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Post()
  @Roles('ADMIN')
  @ApiOperation({ summary: 'Create a new role' })
  @ApiResponse({
    status: 201,
    description: 'Role created successfully',
    type: RoleResponseDto,
  })
  @ApiResponse({
    status: 409,
    description: 'Role with this name already exists',
  })
  async create(@Body() createRoleDto: CreateRoleDto) {
    return await this.rolesService.create(createRoleDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all roles with pagination' })
  @ApiQuery({ name: 'page', required: false, type: Number, example: 1 })
  @ApiQuery({ name: 'limit', required: false, type: Number, example: 10 })
  @ApiResponse({
    status: 200,
    description: 'List of roles with pagination',
    schema: {
      type: 'object',
      properties: {
        data: {
          type: 'array',
          items: { $ref: '#/components/schemas/RoleResponseDto' },
        },
        pagination: {
          type: 'object',
          properties: {
            page: { type: 'number', example: 1 },
            limit: { type: 'number', example: 10 },
            total: { type: 'number', example: 50 },
            pages: { type: 'number', example: 5 },
          },
        },
      },
    },
  })
  async findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    return await this.rolesService.findAll(page, limit);
  }

  @Get('stats')
  @ApiOperation({ summary: 'Get role statistics' })
  @ApiResponse({
    status: 200,
    description: 'Role statistics including user distribution',
    schema: {
      type: 'object',
      properties: {
        totalRoles: { type: 'number', example: 5 },
        totalUsers: { type: 'number', example: 150 },
        roleDistribution: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              id: { type: 'number', example: 1 },
              nameEn: { type: 'string', example: 'ADMIN' },
              nameKh: { type: 'string', example: 'អ្នកគ្រប់គ្រង' },
              userCount: { type: 'number', example: 5 },
            },
          },
        },
      },
    },
  })
  async getStats() {
    return await this.rolesService.getRoleStats();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a role by ID' })
  @ApiParam({ name: 'id', type: 'number', description: 'Role ID' })
  @ApiResponse({
    status: 200,
    description: 'Role details with associated users',
    type: RoleResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Role not found',
  })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.rolesService.findOne(id);
  }

  @Patch(':id')
  @Roles('ADMIN')
  @ApiOperation({ summary: 'Update a role' })
  @ApiParam({ name: 'id', type: 'number', description: 'Role ID' })
  @ApiResponse({
    status: 200,
    description: 'Role updated successfully',
    type: RoleResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Role not found',
  })
  @ApiResponse({
    status: 409,
    description: 'Role with this name already exists',
  })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateRoleDto: UpdateRoleDto,
  ) {
    return await this.rolesService.update(id, updateRoleDto);
  }

  @Delete(':id')
  @Roles('ADMIN')
  @ApiOperation({ summary: 'Delete a role' })
  @ApiParam({ name: 'id', type: 'number', description: 'Role ID' })
  @ApiResponse({
    status: 200,
    description: 'Role deleted successfully',
  })
  @ApiResponse({
    status: 404,
    description: 'Role not found',
  })
  @ApiResponse({
    status: 409,
    description: 'Cannot delete role - it is assigned to users',
  })
  async remove(@Param('id', ParseIntPipe) id: number) {
    await this.rolesService.remove(id);
    return { message: 'Role deleted successfully' };
  }
}
