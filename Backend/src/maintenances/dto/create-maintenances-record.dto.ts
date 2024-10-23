import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class MaintenanceRecordCreateDto {
  @ApiProperty({ type: String, description: 'Record detail' })
  @IsString()
  @IsNotEmpty()
  details: string;

  @ApiProperty({ type: 'string', format: 'binary', description: 'Upload file' })
  @IsOptional()
  image: string;
}
