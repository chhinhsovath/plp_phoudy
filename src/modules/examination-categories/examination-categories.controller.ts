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
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ExaminationCategoriesService } from './examination-categories.service';
import { CreateExaminationCategoryDto } from './dto/create-examination-category.dto';
import { UpdateExaminationCategoryDto } from './dto/update-examination-category.dto';

@Controller('examination-categories')
@UseGuards(JwtAuthGuard)
export class ExaminationCategoriesController {
  constructor(
    private readonly examinationCategoriesService: ExaminationCategoriesService,
  ) {}

  @Post()
  create(@Body() createExaminationCategoryDto: CreateExaminationCategoryDto) {
    return this.examinationCategoriesService.create(
      createExaminationCategoryDto,
    );
  }

  @Get()
  findAll() {
    return this.examinationCategoriesService.findAll();
  }

  @Get('by-subject/:subjectId')
  findBySubject(@Param('subjectId') subjectId: string) {
    return this.examinationCategoriesService.findBySubject(+subjectId);
  }

  @Get('by-sub-subject/:subSubjectId')
  findBySubSubject(@Param('subSubjectId') subSubjectId: string) {
    return this.examinationCategoriesService.findBySubSubject(+subSubjectId);
  }

  @Get('by-type')
  findByType(@Query('type') type: string) {
    return this.examinationCategoriesService.findByType(type);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.examinationCategoriesService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateExaminationCategoryDto: UpdateExaminationCategoryDto,
  ) {
    return this.examinationCategoriesService.update(
      +id,
      updateExaminationCategoryDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.examinationCategoriesService.remove(+id);
  }
}
