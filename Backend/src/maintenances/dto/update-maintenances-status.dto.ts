import { IsEnum, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { RequestStatus } from '@prisma/client';

export class MaintenanceStatusUpdateDto {
  @ApiProperty({
    type: 'String',
    enum: RequestStatus,
    enumName: 'RequestStatus',
    description:
      'The new status for the maintenance record. This value must be a valid role defined in the system.',
  })
  @IsNotEmpty()
  @IsEnum(RequestStatus)
  status: RequestStatus;
}
