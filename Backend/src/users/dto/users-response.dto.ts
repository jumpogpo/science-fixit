import { ApiProperty } from '@nestjs/swagger';
import { Role } from '@prisma/client';
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class RegisterSuccessResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;

  @ApiProperty({ enum: Role })
  role: Role;

  @ApiProperty({ example: 'Optional Google ID' })
  googleId?: string;
}

export class RegisterFailResponseDto {
  @ApiProperty({ example: 'This email is already exist' })
  message: string;

  @ApiProperty({ example: 'Bad Request' })
  error: string;

  @ApiProperty({ example: 400 })
  statusCode: number;
}

export class GetProfileSuccessResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  email: string;

  @ApiProperty({ enum: Role })
  role: Role;
}

export class DeleteUserNotFoundResponseDto {
  @ApiProperty({ example: 'User with ID not found' })
  message: string;

  @ApiProperty({ example: 'Not Found' })
  error: string;

  @ApiProperty({ example: 404 })
  statusCode: number;
}

export class UpdatedUserRoleSuccessResponseDto {
  @ApiProperty({ description: 'User ID', type: String })
  @IsString()
  @IsNotEmpty()
  id: string;

  @ApiProperty({ description: 'User Email', type: String })
  @IsString()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ description: 'User Role', enum: Role })
  @IsString()
  @IsNotEmpty()
  @IsEnum(Role)
  role: Role;

  @ApiProperty({
    description: 'Optional Google ID',
    type: String,
    example: 'Optional Google ID',
  })
  @IsString()
  @IsOptional()
  googleId?: string;
}
