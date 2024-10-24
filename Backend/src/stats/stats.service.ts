import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class StatsService {
  constructor(private prisma: PrismaService) {}

  // This method will return the count of maintenance requests grouped by status
  async getRequestStatusCounts() {
    const defaultStatusCounts = {
      PENDING: 0,
      IN_PROGRESS: 0,
      WAITING_FOR_PART: 0,
      NOT_REPAIRABLE: 0,
      COMPLETED: 0,
    };

    const statuses = await this.prisma.maintenanceRequest.groupBy({
      by: ['status'],
      _count: {
        status: true,
      },
    });

    return statuses.reduce(
      (counts, status) => ({
        ...counts,
        [status.status]: status._count.status,
      }),
      defaultStatusCounts,
    );
  }
}
