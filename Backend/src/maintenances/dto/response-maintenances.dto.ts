import { ApiProperty } from '@nestjs/swagger';
import { RequestStatus } from '@prisma/client';
import { Records } from './records.dto';
import { UsersMaintenanceDto } from 'src/users/dto/users.dto';

export class GetMaintenancesResponseDto {
  @ApiProperty({ type: String })
  readonly id: string;

  @ApiProperty({ type: String })
  readonly building: string;

  @ApiProperty({ type: String })
  readonly room: string;

  @ApiProperty({ type: Number })
  readonly floor: number;

  @ApiProperty({ type: Date })
  readonly requestDate: Date;

  @ApiProperty({ type: String })
  readonly description: string;

  @ApiProperty({ type: String })
  readonly equipment: string;

  @ApiProperty({ type: String })
  readonly imageFileName: string;

  @ApiProperty({ type: RequestStatus, enum: RequestStatus })
  readonly status: RequestStatus;

  @ApiProperty({})
  readonly user?: UsersMaintenanceDto;

  @ApiProperty({ type: Records })
  readonly records?: Records[];
}

export class MaintenanceRequestCreateDto {
  @ApiProperty({ type: String })
  readonly id: string;

  @ApiProperty({ type: String })
  readonly building: string;

  @ApiProperty({ type: String })
  readonly room: string;

  @ApiProperty({ type: Number })
  readonly floor: number;

  @ApiProperty({ type: Date })
  readonly requestDate: Date;

  @ApiProperty({ type: String })
  readonly description: string;

  @ApiProperty({ type: String })
  readonly equipment: string;

  @ApiProperty({ type: String })
  readonly imageFileName: string;

  @ApiProperty({ type: RequestStatus, enum: RequestStatus })
  readonly status: RequestStatus;

  @ApiProperty({ type: String })
  readonly userId: string;
}

export class MaintenanceRequestNotFoundResponseDto {
  @ApiProperty({ type: String, example: 'Maintenance request not found' })
  readonly message: string;

  @ApiProperty({ type: String, example: 'Not Found' })
  readonly error: string;

  @ApiProperty({ type: Number, example: 404 })
  readonly statusCode: number;
}

export class MaintenanceRecordConflictResponseDto {
  @ApiProperty({
    type: String,
    example: 'This maintenance request already has a record.',
  })
  readonly message: string;

  @ApiProperty({ type: String, example: 'Conflict' })
  readonly error: string;

  @ApiProperty({ type: Number, example: 409 })
  readonly statusCode: number;
}

export class MaintenanceRecordUpdateResponseDto {
  @ApiProperty({ type: String })
  readonly id: string;

  @ApiProperty({ type: Date })
  readonly recordDate: Date;

  @ApiProperty({ type: String })
  readonly details: string;

  @ApiProperty({ type: String })
  readonly imageFileName: string;

  @ApiProperty({ type: String })
  readonly technicianId: string;

  @ApiProperty({ type: String })
  readonly requestId: string;
}

export class MaintenanceRequestNotFoundDto {
  @ApiProperty({ type: String, example: 'Maintenance request not found' })
  readonly message: string;

  @ApiProperty({ type: String, example: 'Not Found' })
  readonly error: string;

  @ApiProperty({ type: Number, example: 404 })
  readonly statusCode: number;
}

export class MaintenanceRequestNotFoundResponse {
  message = 'Maintenance request not found';
  error = 'Not Found';
  statusCode = 404;
}

export class MaintenanceRecordNotFoundResponse {
  message = 'This maintenance request does not have a record.';
  error = 'Not Found';
  statusCode = 404;
}
