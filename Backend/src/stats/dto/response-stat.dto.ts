import { ApiProperty } from '@nestjs/swagger';

export class StatsResponse {
  @ApiProperty({
    description: 'Number of maintenance requests with status PENDING',
    type: Number,
  })
  PENDING: number;

  @ApiProperty({
    description: 'Number of maintenance requests with status IN_PROGRESS',
    type: Number,
  })
  IN_PROGRESS: number;

  @ApiProperty({
    description: 'Number of maintenance requests with status WAITING_FOR_PART',
    type: Number,
  })
  WAITING_FOR_PART: number;

  @ApiProperty({
    description: 'Number of maintenance requests with status NOT_REPAIRABLE',
    type: Number,
  })
  NOT_REPAIRABLE: number;

  @ApiProperty({
    description: 'Number of maintenance requests with status COMPLETED',
    type: Number,
  })
  COMPLETED: number;
}
