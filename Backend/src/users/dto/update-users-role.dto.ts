import { ApiProperty } from '@nestjs/swagger';
import { Role } from '@prisma/client';
import { IsEnum, IsNotEmpty } from 'class-validator';

export class UpdateUsersRoleDto {
  @ApiProperty({ description: 'User Role', enum: Role })
  @IsNotEmpty()
  @IsEnum(Role)
  role: Role;
}
