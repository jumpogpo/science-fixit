import { ApiProperty } from '@nestjs/swagger';

export class Technician {
  @ApiProperty({ type: String })
  readonly firstName: string;

  @ApiProperty({ type: String })
  readonly lastName: string;
}
