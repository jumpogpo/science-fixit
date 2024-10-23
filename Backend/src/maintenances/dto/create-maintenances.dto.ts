import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class MaintenanceCreateDto {
  @ApiProperty({ type: String, description: 'Building name' })
  @IsNotEmpty()
  @IsString()
  building: string;

  @ApiProperty({ type: String, description: 'Room number' })
  @IsNotEmpty()
  @IsString()
  room: string;

  @ApiProperty({ type: Number, description: 'Floor number' })
  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  floor: number;

  @ApiProperty({ type: String, description: 'Description of the issue' })
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({ type: String, description: 'Equipment needing maintenance' })
  @IsNotEmpty()
  @IsString()
  equipment: string;

  @ApiProperty({ type: 'string', format: 'binary', description: 'Upload file' })
  @IsOptional()
  image: string;
}
