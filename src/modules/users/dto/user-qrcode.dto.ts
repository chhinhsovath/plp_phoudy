import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginQrDto {
  @ApiProperty({ example: 'username' })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({ example: 'password' })
  @IsString()
  @IsNotEmpty()
  password: string;
}
