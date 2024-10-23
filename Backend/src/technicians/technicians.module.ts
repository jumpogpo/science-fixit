import { Module } from '@nestjs/common';
import { TechniciansService } from './technicians.service';
import { TechniciansController } from './technicians.controller';
import { PrismaService } from 'src/prisma.service';
import { UsersService } from 'src/users/users.service';

@Module({
  controllers: [TechniciansController],
  providers: [TechniciansService, PrismaService, UsersService],
})
export class TechniciansModule {}
