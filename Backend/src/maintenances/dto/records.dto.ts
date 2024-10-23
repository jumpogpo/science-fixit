import { ApiProperty } from '@nestjs/swagger';
import { Technician } from 'src/technicians/dto/technicians.dto';

export class Records {
  @ApiProperty({ type: String })
  readonly id: string;

  @ApiProperty({ type: Date })
  readonly recordDate: Date;

  @ApiProperty({ type: String })
  readonly details: string;

  @ApiProperty({ type: String })
  readonly imageFileName: string;

  @ApiProperty({ type: Technician })
  technician?: Technician;
}
