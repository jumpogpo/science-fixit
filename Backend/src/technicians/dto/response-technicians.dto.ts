import { ApiProperty } from '@nestjs/swagger';
import { Sex } from '@prisma/client';

export class ResponseTechnicianDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  firstName: string;

  @ApiProperty()
  lastName: string;

  @ApiProperty({ enum: Sex })
  sex: Sex;

  @ApiProperty()
  phoneNumber: string;

  @ApiProperty()
  userId: string;
}

export class TechnicianAlreadyExistsResponseDto {
  @ApiProperty({ example: 'Technician already exists' })
  message: string;

  @ApiProperty({ example: 'Bad Request' })
  error: string;

  @ApiProperty({ example: 400 })
  statusCode: number;
}

export class TechnicianNotFoundResponseDto {
  @ApiProperty({ example: 'Technician does not exist' })
  message: string;

  @ApiProperty({ example: 'Not Found' })
  error: string;

  @ApiProperty({ example: 404 })
  statusCode: number;
}

export class TechnicianUpdateNotFoundResponseDto {
  @ApiProperty({ example: 'Updated technician not found' })
  message: string;

  @ApiProperty({ example: 'Not Found' })
  error: string;

  @ApiProperty({ example: 404 })
  statusCode: number;
}
