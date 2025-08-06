import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { School } from '../../entities/school.entity';
import { SchoolPlace } from '../../entities/school-place.entity';
import { District } from '../../entities/district.entity';
import { Province } from '../../entities/province.entity';
import { Commune } from '../../entities/commune.entity';
import { Village } from '../../entities/village.entity';
import { Teacher } from '../../entities/teacher.entity';
import { SchoolsService } from './schools.service';
import { SchoolsController } from './schools.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      School,
      SchoolPlace,
      District,
      Province,
      Commune,
      Village,
      Teacher,
    ]),
  ],
  controllers: [SchoolsController],
  providers: [SchoolsService],
  exports: [SchoolsService],
})
export class SchoolsModule {}
