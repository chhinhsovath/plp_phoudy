import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsEnum,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { Status } from '../../../entities/enums/status.enum';
import { SchoolPlaceDto } from './school-place.dto';

export class CreateSchoolDto {
  @ApiProperty({ example: 'School Name' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ example: 'SCH001' })
  @IsNotEmpty()
  @IsString()
  code: string;

  @ApiProperty({
    type: SchoolPlaceDto,
    description: 'School location information',
    required: false,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => SchoolPlaceDto)
  place?: SchoolPlaceDto;

  @ApiProperty({ example: 'school-profile.jpg', description: 'Profile image' })
  @IsOptional()
  @IsString()
  profile?: string;

  @ApiProperty({ enum: Status, example: Status.ACTIVE })
  @IsOptional()
  @IsEnum(Status)
  status?: Status;
}
