import {
  Body,
  Controller,
  Post,
  Put,
  Param,
  UseGuards,
  Request,
} from '@nestjs/common';
import { TechniciansService } from './technicians.service';
import { CreateTechnicianDto } from './dto/create-technicians.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import {
  ResponseTechnicianDto,
  TechnicianAlreadyExistsResponseDto,
  TechnicianNotFoundResponseDto,
} from './dto/response-technicians.dto';
import { unauthorizedResponse } from 'src/users/response/unauthorized-response';

@ApiTags('Technicians')
@Controller('technicians')
export class TechniciansController {
  constructor(private readonly techniciansService: TechniciansService) {}

  // Create a technician
  @Post(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Create a technician' })
  @ApiParam({ name: 'id', description: 'User ID', required: true })
  @ApiResponse({
    status: 201,
    description: 'Technician created',
    type: ResponseTechnicianDto,
  })
  @ApiResponse(unauthorizedResponse)
  @ApiResponse({
    status: 400,
    description: 'Technician already exists',
    type: TechnicianAlreadyExistsResponseDto,
  })
  async createTechnician(
    @Request() req,
    @Param('id') id: string,
    @Body() createTechnicianDto: CreateTechnicianDto,
  ) {
    return this.techniciansService.createTechnician(
      req,
      id,
      createTechnicianDto,
    );
  }

  // Update a technician
  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Update a technician' })
  @ApiParam({ name: 'id', description: 'User ID', required: true })
  @ApiResponse({
    status: 200,
    description: 'Technician updated',
    type: ResponseTechnicianDto,
  })
  @ApiResponse(unauthorizedResponse)
  @ApiResponse({
    status: 404,
    description: 'Technician not found',
    type: TechnicianNotFoundResponseDto,
  })
  async updateTechnician(
    @Request() req,
    @Param('id') id: string,
    @Body() updateTechnicianDto: CreateTechnicianDto,
  ) {
    return this.techniciansService.updateTechnician(
      req,
      id,
      updateTechnicianDto,
    );
  }
}
