import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty({ description: 'User Email', example: 'string@kmitl.ac.th' })
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'User Password' })
  @IsNotEmpty()
  @IsString()
  password: string;
}
