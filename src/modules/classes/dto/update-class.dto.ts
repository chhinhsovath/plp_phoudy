import { IsString, IsNumber, Min, Max, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateClassDto {
  @ApiProperty({ description: 'The name of the class' })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({ description: 'The grade level (0-6)', minimum: 0, maximum: 6 })
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(6)
  gradeLevel?: number;
}
