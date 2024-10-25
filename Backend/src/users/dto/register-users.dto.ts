import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class RegisterDto {
  @ApiProperty({ description: 'User Email', example: 'string@kmitl.ac.th' })
  @IsNotEmpty()
  @IsString()
  email: string;

  @ApiProperty({ description: 'User Password' })
  @IsNotEmpty()
  @IsString()
  password: string;
}
