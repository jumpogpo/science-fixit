import {
  Controller,
  Post,
  Body,
  Get,
  Delete,
  Patch,
  Param,
  UseGuards,
  Request,
  Query,
  HttpCode,
  HttpStatus,
  UnauthorizedException,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { RegisterDto } from './dto/register-users.dto';
import { UpdateUsersRoleDto } from './dto/update-users-role.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiQuery,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { unauthorizedResponse } from './response/unauthorized-response';
import {
  GetProfileSuccessResponseDto,
  RegisterSuccessResponseDto,
  RegisterFailResponseDto,
  DeleteUserNotFoundResponseDto,
  UpdatedUserRoleSuccessResponseDto,
} from './dto/users-response.dto';
import { Role } from '@prisma/client';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // Register user
  @Post('/register')
  @ApiOperation({ summary: 'User registration' })
  @ApiResponse({
    status: 201,
    description: 'User created',
    type: RegisterSuccessResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Email already exists',
    type: RegisterFailResponseDto,
  })
  create(@Body() createUserDto: RegisterDto) {
    return this.usersService.create(createUserDto);
  }

  // Get user profile
  @Get('/profile')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get user profile' })
  @ApiResponse({
    status: 200,
    description: 'User profile success',
    type: GetProfileSuccessResponseDto,
  })
  async getProfile(@Request() req) {
    const { id, email, role } = await this.usersService.findByEmail(
      req.user.email,
    );
    return { id, email, role };
  }

  // Get user by userId
  @Get('/:id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get user by id' })
  @ApiParam({ name: 'id', description: 'User ID' })
  @ApiResponse({
    status: 200,
    description: 'User profile success',
    type: GetProfileSuccessResponseDto,
  })
  @ApiResponse(unauthorizedResponse)
  @ApiResponse({
    status: 404,
    description: 'User not found',
    type: DeleteUserNotFoundResponseDto,
  })
  async getUserById(@Request() req, @Param('id') id: string) {
    const user = await this.usersService.findByEmail(req.user.email);

    if (user.role !== Role.ADMIN)
      throw new UnauthorizedException("You don't have permission");

    const findResult = await this.usersService.findById(id);

    if (!findResult) throw new NotFoundException('User not found');

    delete findResult.password;
    delete findResult.googleId;
    delete findResult.technician?.userId;
    return findResult;
  }

  // Get all users
  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiQuery({
    name: 'filter',
    required: false,
    type: String,
    description: 'Filter by email or ID',
  })
  @ApiQuery({
    name: 'role',
    required: false,
    enum: Role,
    description: 'Filter by role',
  })
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({
    status: 200,
    description: 'Get all users success',
    type: GetProfileSuccessResponseDto,
    isArray: true,
  })
  @ApiResponse(unauthorizedResponse)
  async getUsers(
    @Request() req,
    @Query('filter') filter?: string,
    @Query('role') role?: Role,
  ) {
    return this.usersService.getUsers(req, filter, role);
  }

  // Delete user by id
  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiParam({ name: 'id', description: 'User ID' })
  @ApiOperation({ summary: 'Delete user' })
  @ApiResponse({ status: 204, description: 'User deleted' })
  @ApiResponse(unauthorizedResponse)
  @ApiResponse({
    status: 404,
    description: 'User not found',
    type: DeleteUserNotFoundResponseDto,
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteUser(@Request() req, @Param('id') id: string) {
    return this.usersService.deleteUser(req, id);
  }

  // Update user role
  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiParam({ name: 'id', description: 'User ID' })
  @ApiOperation({ summary: 'Update user role' })
  @ApiResponse({
    status: 200,
    description: 'User role updated',
    type: UpdatedUserRoleSuccessResponseDto,
  })
  @ApiResponse(unauthorizedResponse)
  @ApiResponse({
    status: 404,
    description: 'User not found',
    type: DeleteUserNotFoundResponseDto,
  })
  async updateUserRole(
    @Request() req,
    @Param('id') id: string,
    @Body() updateUsersRoleDto: UpdateUsersRoleDto,
  ) {
    return this.usersService.updateUserRole(req, id, updateUsersRoleDto);
  }
}
