import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { RegisterDto } from './dto/register-users.dto';
import { PrismaService } from 'src/prisma.service';
import { Role, User } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { UsersDto } from './dto/users.dto';
import { UpdateUsersRoleDto } from './dto/update-users-role.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  // Create user with email and password
  async create(createData: RegisterDto): Promise<User> {
    const user: User | null = await this.prisma.user.findUnique({
      where: { email: createData.email },
    });

    if (user) throw new BadRequestException('This email is already exist');

    return this.prisma.user.create({
      data: {
        email: createData.email,
        password: await bcrypt.hash(createData.password, 10),
      },
    });
  }

  // Find user by email
  async findByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
      include: {
        technician: true,
      },
    });
  }

  // Find user by id
  async findById(id: string) {
    return this.prisma.user.findUnique({
      where: { id },
      include: {
        technician: true,
      },
    });
  }

  // Get all users
  async getUsers(req, filter?: string, role?: Role): Promise<UsersDto[]> {
    const user = await this.findByEmail(req.user.email);

    if (user.role !== Role.ADMIN) {
      throw new UnauthorizedException("You don't have permission");
    }

    // Dynamic filter object for Prisma query
    const where: any = {};

    if (filter) {
      where.OR = [
        { email: { contains: filter, mode: 'insensitive' } }, // Case-insensitive match on email
        { id: { contains: filter } }, // Match on id
      ];
    }

    if (role) {
      where.role = role; // Match on role
    }

    return this.prisma.user.findMany({
      where,
      select: {
        id: true,
        email: true,
        role: true,
        technician: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            phoneNumber: true,
            sex: true,
          },
        },
      },
    });
  }

  // Delete user
  async deleteUser(req, id: string): Promise<{ message: string }> {
    const user = await this.findByEmail(req.user.email);

    if (user.role !== Role.ADMIN)
      throw new UnauthorizedException("You don't have permission");

    try {
      await this.prisma.user.delete({
        where: {
          id: id,
        },
      });
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException(`User with ID ${id} not found`);
      }

      throw error;
    }

    return;
  }

  // Update user role
  async updateUserRole(req, id: string, body: UpdateUsersRoleDto) {
    const user = await this.findByEmail(req.user.email);

    if (user.role !== Role.ADMIN)
      throw new UnauthorizedException("You don't have permission");

    try {
      const updatedUser = await this.prisma.user.update({
        where: {
          id,
        },
        data: {
          role: body.role,
        },
        select: {
          id: true,
          email: true,
          role: true,
        },
      });

      return updatedUser;
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException('User not found');
      }

      throw error;
    }
  }
}
