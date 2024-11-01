import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { MaintenanceCreateDto } from './dto/create-maintenances.dto';
import { PrismaService } from 'src/prisma.service';
import * as fs from 'fs';
import { extname } from 'path';
import { MaintenanceStatusUpdateDto } from './dto/update-maintenances-status.dto';
import { RequestStatus, Role, User } from '@prisma/client';
import { UsersService } from 'src/users/users.service';
import { MaintenanceRecordCreateDto } from './dto/create-maintenances-record.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class MaintenancesService {
  constructor(
    private prisma: PrismaService,
    private readonly usersService: UsersService,
  ) {}

  // Get all maintenance requests
  async getMaintenances(filters: {
    requestDate?: Date;
    id?: string;
    status?: RequestStatus;
  }) {
    return await this.prisma.maintenanceRequest.findMany({
      where: {
        ...(filters.requestDate && { requestDate: filters.requestDate }),
        ...(filters.id && { id: filters.id }),
        ...(filters.status && { status: filters.status }),
      },
      select: {
        id: true,
        building: true,
        room: true,
        floor: true,
        requestDate: true,
        description: true,
        equipment: true,
        imageFileName: true,
        status: true,
        user: {
          select: {
            email: true,
          },
        },
        records: {
          select: {
            id: true,
            recordDate: true,
            details: true,
            imageFileName: true,
            technician: {
              select: {
                firstName: true,
                lastName: true,
              },
            },
          },
        },
      },
    });
  }

  // Get maintenance request by id
  async getMaintenancesById(id: string) {
    const maintenanceRequest = await this.prisma.maintenanceRequest.findUnique({
      where: { id },
      select: {
        id: true,
        building: true,
        room: true,
        floor: true,
        requestDate: true,
        description: true,
        equipment: true,
        imageFileName: true,
        status: true,
        user: {
          select: {
            email: true,
          },
        },
        records: {
          select: {
            id: true,
            recordDate: true,
            details: true,
            imageFileName: true,
            technician: {
              select: {
                firstName: true,
                lastName: true,
              },
            },
          },
        },
      },
    });

    if (!maintenanceRequest)
      throw new NotFoundException('Maintenance request not found');

    return maintenanceRequest;
  }

  // Create maintenance request
  async createMaintenanceRequest(
    req,
    body: MaintenanceCreateDto,
    image: Express.Multer.File,
  ) {
    const user: User = await this.usersService.findByEmail(req.user.email);

    if (!user) throw new NotFoundException('User not found');

    return this.prisma.$transaction(async (prisma) => {
      // Step 1: Rename the file
      const newFileName = await this.saveFile(image);

      // Step 2: Create the maintenance request
      return await prisma.maintenanceRequest.create({
        data: {
          building: body.building,
          room: body.room,
          floor: Number(body.floor),
          description: body.description,
          equipment: body.equipment,
          imageFileName: newFileName,
          user: {
            connect: {
              ...(req.user.id
                ? { id: req.user.id }
                : { email: req.user.email }),
            },
          },
        },
      });
    });
  }

  // Update maintenance request status
  async updateMaintenanceStatus(
    req,
    id: string,
    body: MaintenanceStatusUpdateDto,
  ) {
    const user: User = await this.usersService.findByEmail(req.user.email);

    if (!user) throw new NotFoundException('User not found');
    if (user.role !== Role.TECHNICIAN && user.role !== Role.ADMIN)
      throw new UnauthorizedException("You don't have permission");

    try {
      const updatedMaintenanceRequest =
        await this.prisma.maintenanceRequest.update({
          where: { id },
          data: { status: body.status },
        });

      return updatedMaintenanceRequest;
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException('Maintenance request not found');
      }

      throw new Error('Failed to update maintenance request');
    }
  }

  // Delete maintenance request
  async deleteMaintenanceRequest(req, id: string) {
    const user: User = await this.usersService.findByEmail(req.user.email);

    if (!user) throw new NotFoundException('User not found');
    if (user.role !== Role.TECHNICIAN && user.role !== Role.ADMIN)
      throw new UnauthorizedException("You don't have permission");

    try {
      await this.prisma.maintenanceRequest.delete({
        where: { id },
      });
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException('Maintenance request not found');
      }

      throw new Error('Failed to delete maintenance request');
    }
  }

  // Create maintenance record
  async createMaintenanceRecord(
    req,
    id: string,
    body: MaintenanceRecordCreateDto,
    image: Express.Multer.File,
  ) {
    const user = await this.usersService.findByEmail(req.user.email);

    if (!user) throw new NotFoundException('User not found');

    if (!user.technician)
      throw new NotFoundException('Technician data not found');

    if (user.role !== Role.TECHNICIAN && user.role !== Role.ADMIN)
      throw new UnauthorizedException("You don't have permission");

    return this.prisma.$transaction(async (prisma) => {
      // Step 1: Find the maintenance request
      const maintenanceRequest = await prisma.maintenanceRequest.findUnique({
        where: { id },
        include: {
          records: true,
        },
      });

      if (!maintenanceRequest)
        throw new NotFoundException('Maintenance request not found');

      if (maintenanceRequest.records)
        throw new ConflictException(
          'This maintenance request already has a record.',
        );

      // Step 2: Rename the image file
      const newFileName: string = await this.saveFile(image);

      // Step 3: Create the maintenance record
      const maintenanceRecord = await prisma.maintenanceRecord.create({
        data: {
          details: body.details,
          imageFileName: newFileName,
          request: {
            connect: { id },
          },
          technician: {
            connect: { id: user.technician.id },
          },
        },
      });

      return maintenanceRecord;
    });
  }

  // Update maintenance record
  async updateMaintenanceRecord(
    req,
    id: string,
    body: MaintenanceRecordCreateDto,
    image: Express.Multer.File,
  ) {
    const user = await this.usersService.findByEmail(req.user.email);

    if (!user) throw new NotFoundException('User not found');

    if (!user.technician)
      throw new NotFoundException('Technician data not found');

    if (user.role !== Role.TECHNICIAN && user.role !== Role.ADMIN)
      throw new UnauthorizedException("You don't have permission");

    return this.prisma.$transaction(async (prisma) => {
      // Step 1: Find the maintenance request
      const maintenanceRequest = await prisma.maintenanceRequest.findUnique({
        where: { id },
        include: {
          records: true,
        },
      });

      if (!maintenanceRequest)
        throw new NotFoundException('Maintenance request not found');

      if (!maintenanceRequest.records)
        throw new NotFoundException(
          'This maintenance request does not have a record.',
        );

      // Step 2: Rename the image file
      const newFileName: string = await this.saveFile(image);

      // Step 3: Update the maintenance record
      const maintenanceRecord = await prisma.maintenanceRecord.update({
        where: { id: maintenanceRequest.records.id },
        data: {
          ...body,
          imageFileName: newFileName,
        },
      });

      await this.removeFile(maintenanceRequest.records.imageFileName);
      return maintenanceRecord;
    });
  }

  async deleteMaintenanceRecord(req, id: string) {
    const user = await this.usersService.findByEmail(req.user.email);

    if (!user) throw new NotFoundException('User not found');

    if (user.role !== Role.TECHNICIAN && user.role !== Role.ADMIN)
      throw new UnauthorizedException("You don't have permission");

    return this.prisma.$transaction(async (prisma) => {
      // Step 1: Find the maintenance request
      const maintenanceRequest = await prisma.maintenanceRequest.findUnique({
        where: { id },
        include: {
          records: true,
        },
      });

      if (!maintenanceRequest)
        throw new NotFoundException('Maintenance request not found');

      if (!maintenanceRequest.records)
        throw new NotFoundException(
          'This maintenance request does not have a record.',
        );

      // Step 2: Delete the maintenance record
      await prisma.maintenanceRecord.delete({
        where: { id: maintenanceRequest.records.id },
      });

      // Step 3: Remove the image file
      await this.removeFile(maintenanceRequest.records.imageFileName);
    });
  }

  // Save file manually
  private async saveFile(image: Express.Multer.File): Promise<string> {
    const uniqueId = uuidv4();
    const fileExt = extname(image.originalname);
    const newFileName = `${uniqueId}${fileExt}`;
    const writeStream = fs.createWriteStream(`./uploads/${newFileName}`);
    writeStream.write(image.buffer);
    writeStream.end();
    return newFileName;
  }

  // Remove file manually
  private async removeFile(imageFileName: string): Promise<void> {
    const filePath = `./uploads/${imageFileName}`;

    try {
      await fs.promises.access(filePath);
      await fs.promises.unlink(filePath);
    } catch (error) {
      if (error.code === 'ENOENT') {
        // File does not exist
      } else {
        throw new Error('Failed to remove the file');
      }
    }
  }
}
