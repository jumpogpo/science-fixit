import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty({ description: 'User Email' })
  @IsNotEmpty()
  @IsString()
  email: string;

  @ApiProperty({ description: 'User Password' })
  @IsNotEmpty()
  @IsString()
  password: string;
}
