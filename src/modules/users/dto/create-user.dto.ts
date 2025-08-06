import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  MinLength,
  IsOptional,
  IsNumber,
  IsObject,
  ValidateNested,
  IsDate,
} from 'class-validator';
import { Type } from 'class-transformer';
import { Gender } from '../../../entities/user.entity';
import { UserResidenceDto } from './user-residence.dto';
import { UserPobDto } from './user-pob.dto';

export class CreateUserDto {
  @ApiProperty({ example: 'john_doe' })
  @IsNotEmpty()
  @IsString()
  username: string;

  @ApiProperty({ example: 'John' })
  @IsNotEmpty()
  @IsString()
  first_name: string;

  @ApiProperty({ example: 'Doe' })
  @IsNotEmpty()
  @IsString()
  last_name: string;

  @ApiProperty({ example: 'john.doe@example.com' })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'password123' })
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  password: string;

  @ApiProperty({ example: 1 })
  @IsNotEmpty()
  @IsNumber()
  roleId: number;

  @ApiProperty({ example: '1990-01-01' })
  @IsNotEmpty()
  @IsDate()
  date_of_birth: Date;

  @ApiProperty({ enum: Gender, example: Gender.MALE })
  @IsNotEmpty()
  @IsEnum(Gender)
  gender: Gender;

  @ApiProperty({ example: '0123456789', required: false })
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiProperty({ example: 'https://example.com/profile.jpg', required: false })
  @IsOptional()
  @IsString()
  profile_picture?: string;

  @ApiProperty({ example: 'Cambodian', required: false })
  @IsOptional()
  @IsString()
  nationality?: string;

  @ApiProperty({
    example: {
      provinceId: 1,
      districtId: 1,
      communeId: 1,
      villageId: 1,
      fullAddress: '123 Main Street, Phnom Penh, Cambodia',
    },
    required: false,
    description: 'Current residence information',
  })
  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => UserResidenceDto)
  residence?: UserResidenceDto;

  @ApiProperty({
    example: {
      provinceId: 2,
      districtId: 2,
      communeId: 2,
      villageId: 2,
    },
    required: false,
    description: 'Place of birth information',
  })
  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => UserPobDto)
  placeOfBirth?: UserPobDto;
}
