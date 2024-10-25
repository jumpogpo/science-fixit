import { Role, Technician } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

export class UsersDto {
  @ApiProperty({ type: String, description: 'UserId' })
  @IsNotEmpty()
  @IsString()
  readonly id: string;

  @ApiProperty({ type: String, description: 'User Email' })
  @IsNotEmpty()
  @IsString()
  readonly email: string;

  @ApiProperty({ type: Role, description: 'User Role', enum: Role })
  @IsNotEmpty()
  @IsEnum(Role)
  readonly role: Role;

  readonly technicians?: Technician[];
}

export class UsersMaintenanceDto {
  @ApiProperty({ type: String, description: 'User Email' })
  @IsNotEmpty()
  @IsString()
  readonly email: string;
}

export class PermissionDeniedResponseDto {
  @ApiProperty({ example: 'Permission Denied' })
  message: string;

  @ApiProperty({ example: 'Unauthorized' })
  error: string;

  @ApiProperty({ example: 401 })
  statusCode: number;
}
