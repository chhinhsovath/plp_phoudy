import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { SubSubjectsService } from './sub-subjects.service';
import { CreateSubSubjectDto } from './dto/create-sub-subject.dto';
import { UpdateSubSubjectDto } from './dto/update-sub-subject.dto';
import { SubSubjectDto } from './dto/sub-subject.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@ApiTags('Sub Subjects')
@Controller('sub-subjects')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class SubSubjectsController {
  constructor(private readonly subSubjectsService: SubSubjectsService) {}

  @Post()
  @Roles('ADMIN', 'TEACHER')
  @UseGuards(RolesGuard)
  @ApiOperation({ summary: 'Create a new sub subject' })
  @ApiResponse({
    status: 201,
    description: 'Sub subject successfully created',
    type: SubSubjectDto,
  })
  create(@Body() createSubSubjectDto: CreateSubSubjectDto) {
    return this.subSubjectsService.create(createSubSubjectDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all sub subjects' })
  @ApiResponse({
    status: 200,
    description: 'Return all sub subjects',
    type: [SubSubjectDto],
  })
  findAll() {
    return this.subSubjectsService.findAll();
  }

  @Get('by-subject/:subjectId')
  @ApiOperation({ summary: 'Get sub subjects by subject ID' })
  @ApiResponse({
    status: 200,
    description: 'Return sub subjects for the specified subject',
    type: [SubSubjectDto],
  })
  findBySubject(@Param('subjectId') subjectId: string) {
    return this.subSubjectsService.findBySubject(+subjectId);
  }

  @Get('by-status')
  @ApiOperation({ summary: 'Get sub subjects by status' })
  @ApiResponse({
    status: 200,
    description: 'Return sub subjects with the specified status',
    type: [SubSubjectDto],
  })
  findByStatus(@Query('status') status: string) {
    return this.subSubjectsService.findByStatus(status);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a sub subject by ID' })
  @ApiResponse({
    status: 200,
    description: 'Return the sub subject',
    type: SubSubjectDto,
  })
  @ApiResponse({ status: 404, description: 'Sub subject not found' })
  findOne(@Param('id') id: string) {
    return this.subSubjectsService.findOne(+id);
  }

  @Patch(':id')
  @Roles('ADMIN', 'TEACHER')
  @UseGuards(RolesGuard)
  @ApiOperation({ summary: 'Update a sub subject' })
  @ApiResponse({
    status: 200,
    description: 'Sub subject successfully updated',
    type: SubSubjectDto,
  })
  @ApiResponse({ status: 404, description: 'Sub subject not found' })
  update(
    @Param('id') id: string,
    @Body() updateSubSubjectDto: UpdateSubSubjectDto,
  ) {
    return this.subSubjectsService.update(+id, updateSubSubjectDto);
  }

  @Delete(':id')
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @ApiOperation({ summary: 'Delete a sub subject' })
  @ApiResponse({ status: 200, description: 'Sub subject successfully deleted' })
  @ApiResponse({ status: 404, description: 'Sub subject not found' })
  remove(@Param('id') id: string) {
    return this.subSubjectsService.remove(+id);
  }
}
