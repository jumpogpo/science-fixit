import { Controller, Get } from '@nestjs/common';
import { StatsService } from './stats.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { StatsResponse } from './dto/response-stat.dto';

@ApiTags('Stats')
@Controller('stats')
export class StatsController {
  constructor(private readonly statsService: StatsService) {}

  @Get()
  @ApiOperation({ summary: 'Get Maintenances Stats' })
  @ApiResponse({
    status: 200,
    description: 'Return the count of maintenance requests grouped by status',
    type: StatsResponse,
  })
  async getRequestStatusCounts() {
    return this.statsService.getRequestStatusCounts();
  }
}
