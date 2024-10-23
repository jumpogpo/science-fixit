import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateTechnicianDto } from './dto/create-technicians.dto';
import { UsersService } from '../users/users.service';
import { Role } from '@prisma/client';

@Injectable()
export class TechniciansService {
  constructor(
    private prisma: PrismaService,
    private readonly usersService: UsersService,
  ) {}

  // Create a technician
  async createTechnician(req, id: string, body: CreateTechnicianDto) {
    const phoneNumberRegex = /^0[689][0-9]{8}$/;

    if (!phoneNumberRegex.test(body.phoneNumber)) {
      throw new BadRequestException(
        'Invalid phone number format. Must be a valid Thai phone number.',
      );
    }

    const user = await this.usersService.findByEmail(req.user.email);

    if (!user) throw new NotFoundException('User not found');
    if (user.role !== Role.ADMIN)
      throw new UnauthorizedException("You don't have permission");

    const updatedUser = await this.usersService.findById(id);

    if (!updatedUser) throw new NotFoundException('Updated user not found');
    if (updatedUser.technician)
      throw new BadRequestException('Technician already exists');

    // Execute transaction and return technician
    const technician = await this.prisma.$transaction(async (prisma) => {
      // Create technician
      const technician = await prisma.technician.create({
        data: {
          firstName: body.firstName,
          lastName: body.lastName,
          sex: body.sex,
          phoneNumber: body.phoneNumber,
          user: {
            connect: {
              id: updatedUser.id,
            },
          },
        },
      });

      // Update user role if necessary
      if (updatedUser.role === Role.USER) {
        await prisma.user.update({
          where: { id: updatedUser.id },
          data: { role: Role.TECHNICIAN },
        });
      }

      // Return the created technician within the transaction
      return technician;
    });

    return technician;
  }

  // Update a technician
  async updateTechnician(req, id: string, body: CreateTechnicianDto) {
    const phoneNumberRegex = /^0[689][0-9]{8}$/;

    if (!phoneNumberRegex.test(body.phoneNumber)) {
      throw new BadRequestException(
        'Invalid phone number format. Must be a valid Thai phone number.',
      );
    }

    const user = await this.usersService.findByEmail(req.user.email);

    if (!user) throw new NotFoundException('User not found');
    if (user.role !== Role.ADMIN)
      throw new UnauthorizedException("You don't have permission");

    const updatedUser = await this.usersService.findById(id);

    if (!updatedUser) throw new NotFoundException('Updated user not found');
    if (!updatedUser.technician)
      throw new BadRequestException('Technician does not exist');

    return await this.prisma.technician.update({
      where: { id: updatedUser.technician.id },
      data: body,
    });
  }
}
