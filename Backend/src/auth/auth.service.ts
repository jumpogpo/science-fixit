import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class AuthService {
  private emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
    private prisma: PrismaService,
  ) {}

  // Validate user
  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.findByEmail(email);

    if (user && (await bcrypt.compare(password, user.password))) {
      return {
        id: user.id,
        email: user.email,
      };
    }

    return null;
  }

  // Normal Login
  login(user: any) {
    const payload = { email: user.email, id: user.id };

    if (!this.emailRegex.test(user.email)) {
      throw new BadRequestException('Invalid email format');
    }

    return {
      accessToken: this.jwtService.sign(payload),
    };
  }

  // Google Login
  async googleLogin(user): Promise<any> {
    const { email, googleId } = user;

    if (!this.emailRegex.test(user.email)) {
      throw new BadRequestException('Invalid email format');
    }

    let userData = await this.prisma.user.findUnique({ where: { email } });

    // Create user data when data is null
    if (!userData) {
      const randomPassword = Math.random().toString(36).slice(-16);
      const hashedPassword = await bcrypt.hash(randomPassword, 10);

      userData = await this.prisma.user.create({
        data: {
          email,
          password: hashedPassword,
          googleId,
        },
      });
    }

    const payload = { id: userData.id, email: user.email };
    return { accessToken: this.jwtService.sign(payload) };
  }
}
