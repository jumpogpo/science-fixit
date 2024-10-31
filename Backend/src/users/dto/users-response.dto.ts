import { ApiProperty } from '@nestjs/swagger';
import { Role, Technician } from '@prisma/client';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

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

  @ApiProperty({
    type: 'object',
    properties: {
      id: { type: 'string' },
      firstName: { type: 'string' },
      lastName: { type: 'string' },
      sex: { type: 'string' },
      phoneNumber: { type: 'string' },
    },
  })
  technician: Technician;
}

export class GetAllUserSuccessResponseDto {
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
}
