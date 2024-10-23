import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { Sex } from '@prisma/client';

export class CreateTechnicianDto {
  @ApiProperty({ description: 'First Name' })
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @ApiProperty({ description: 'Last Name' })
  @IsNotEmpty()
  @IsString()
  lastName: string;

  @ApiProperty({ description: 'Sex', enum: Sex })
  @IsEnum(Sex)
  @IsNotEmpty()
  sex: Sex;

  @ApiProperty({ description: 'Phone Number' })
  @IsNotEmpty()
  @IsString()
  phoneNumber: string;
}
