import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsOptional,
  IsString,
  IsEmail,
  IsDateString,
  IsNumber,
  MinLength,
  IsEnum,
} from 'class-validator';
import { Gender } from 'src/entities/user.entity';
import { Transform } from 'class-transformer';

export class UpdateMyAccountDto {
  @ApiPropertyOptional({ example: 'teacher1' })
  @IsOptional()
  @IsString()
  username?: string;

  @ApiPropertyOptional({ example: 'Alex' })
  @IsOptional()
  @IsString()
  first_name?: string;

  @ApiPropertyOptional({ example: 'Cummings' })
  @IsOptional()
  @IsString()
  last_name?: string;

  @ApiPropertyOptional({ example: 'teacher1@email.com' })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiPropertyOptional({ example: 'newpassword123' })
  @IsOptional()
  @IsString()
  @MinLength(8)
  @Transform(({ value }) => value?.trim())
  newPassword?: string;

  @ApiPropertyOptional({ example: '1990-01-01' })
  @IsOptional()
  @IsDateString()
  date_of_birth?: string;

  @ApiPropertyOptional({ enum: Gender, example: Gender.MALE })
  @IsOptional()
  @IsEnum(Gender)
  gender?: Gender;

  @ApiPropertyOptional({ example: 'TenaKhimPhun.jpg' })
  @IsOptional()
  @IsString()
  profile_picture?: string;

  @ApiPropertyOptional({ example: '+1234567890' })
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  teacher_number?: string;

  @ApiPropertyOptional({ example: 1 })
  @IsOptional()
  @IsNumber()
  provinceId?: number;

  @ApiPropertyOptional({ example: 1 })
  @IsOptional()
  @IsNumber()
  districtId?: number;

  @ApiPropertyOptional({ example: 1 })
  @IsOptional()
  @IsNumber()
  communeId?: number;

  @ApiPropertyOptional({ example: 1 })
  @IsOptional()
  @IsNumber()
  villageId?: number;

  @ApiPropertyOptional({ example: 'Cambodian' })
  @IsOptional()
  @IsString()
  nationality?: string;
}
