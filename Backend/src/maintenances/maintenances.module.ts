import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { MaintenancesService } from './maintenances.service';
import { MaintenancesController } from './maintenances.controller';
import { PrismaService } from 'src/prisma.service';
import { UsersService } from 'src/users/users.service';
import { memoryStorage } from 'multer';

@Module({
  imports: [
    MulterModule.registerAsync({
      useFactory: () => ({
        storage: memoryStorage(),
      }),
    }),
  ],
  controllers: [MaintenancesController],
  providers: [MaintenancesService, PrismaService, UsersService],
})
export class MaintenancesModule {}
