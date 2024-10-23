import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Request,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  ParseFilePipe,
} from '@nestjs/common';
import { MaintenancesService } from './maintenances.service';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiConsumes,
} from '@nestjs/swagger';
import { MaintenanceCreateDto } from './dto/create-maintenances.dto';
import { MaintenanceStatusUpdateDto } from './dto/update-maintenances-status.dto';
import { MaintenanceRecordCreateDto } from './dto/create-maintenances-record.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileTypeValidator } from '@nestjs/common';
import {
  GetMaintenancesResponseDto,
  MaintenanceRequestCreateDto,
  MaintenanceRequestNotFoundResponseDto,
  MaintenanceRecordConflictResponseDto,
  MaintenanceRecordUpdateResponseDto,
} from './dto/response-maintenances.dto';
import { unauthorizedResponse } from 'src/users/response/unauthorized-response';

@ApiTags('Maintenances')
@Controller('maintenances')
export class MaintenancesController {
  constructor(private readonly maintenancesService: MaintenancesService) {}

  // Get all maintenance requests
  @Get()
  @ApiOperation({ summary: 'Get all maintenance requests' })
  @ApiResponse({
    status: 200,
    description: 'Return all maintenance requests',
    type: [GetMaintenancesResponseDto],
  })
  getMaintenances() {
    return this.maintenancesService.getMaintenances();
  }

  // Get maintenance request by id
  @Get(':id')
  @ApiOperation({ summary: 'Get maintenance request by id' })
  @ApiParam({ name: 'id', type: String, description: 'Maintenance request ID' })
  @ApiResponse({
    status: 200,
    description: 'Return maintenance request',
    type: GetMaintenancesResponseDto,
  })
  @ApiResponse(unauthorizedResponse)
  @ApiResponse({
    status: 404,
    description: 'Maintenance request not found',
    type: MaintenanceRequestNotFoundResponseDto,
  })
  getMaintenancesById(@Param('id') id: string) {
    return this.maintenancesService.getMaintenancesById(id);
  }

  // Create maintenance request
  @Post()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('image'))
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Create maintenance request' })
  @ApiResponse({
    status: 201,
    description: 'Maintenance request created',
    type: MaintenanceRequestCreateDto,
  })
  @ApiResponse(unauthorizedResponse)
  async createMaintenanceRequest(
    @Request() req,
    @Body() body: MaintenanceCreateDto,
    @UploadedFile(
      new ParseFilePipe({
        validators: [new FileTypeValidator({ fileType: 'image/*' })],
        fileIsRequired: true,
      }),
    )
    image: Express.Multer.File,
  ) {
    return this.maintenancesService.createMaintenanceRequest(req, body, image);
  }

  // Update maintenance request status
  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Update maintenance request status' })
  @ApiParam({ name: 'id', type: String, description: 'Maintenance request ID' })
  @ApiResponse({
    status: 200,
    description: 'Maintenance request status updated',
    type: MaintenanceRequestCreateDto,
  })
  @ApiResponse(unauthorizedResponse)
  async updateMaintenanceStatus(
    @Request() req,
    @Param('id') id: string,
    @Body() body: MaintenanceStatusUpdateDto,
  ) {
    return this.maintenancesService.updateMaintenanceStatus(req, id, body);
  }

  // Create maintenance record
  @Post(':id/record')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('image'))
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Create maintenance record' })
  @ApiParam({ name: 'id', type: String, description: 'Maintenance request ID' })
  @ApiResponse({
    status: 200,
    description: 'Maintenance record created',
    type: MaintenanceRecordUpdateResponseDto,
  })
  @ApiResponse(unauthorizedResponse)
  @ApiResponse({
    status: 409,
    description: 'This maintenance request already has a record.',
    type: MaintenanceRecordConflictResponseDto,
  })
  async createRecordMaintenanceRequest(
    @Request() req,
    @Param('id') id: string,
    @Body() body: MaintenanceRecordCreateDto,
    @UploadedFile(
      new ParseFilePipe({
        validators: [new FileTypeValidator({ fileType: 'image/*' })],
        fileIsRequired: true,
      }),
    )
    image: Express.Multer.File,
  ) {
    return this.maintenancesService.createMaintenanceRecord(
      req,
      id,
      body,
      image,
    );
  }

  // Update maintenance record
  @Put(':id/record')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('image'))
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Update maintenance record' })
  @ApiParam({ name: 'id', type: String, description: 'Maintenance request ID' })
  @ApiResponse({
    status: 200,
    description: 'Maintenance record updated',
    type: MaintenanceRecordUpdateResponseDto,
  })
  @ApiResponse(unauthorizedResponse)
  async updateRecordMaintenanceRequest(
    @Request() req,
    @Param('id') id: string,
    @Body() body: MaintenanceRecordCreateDto,
    @UploadedFile(
      new ParseFilePipe({
        validators: [new FileTypeValidator({ fileType: 'image/*' })],
        fileIsRequired: true,
      }),
    )
    image: Express.Multer.File,
  ) {
    return this.maintenancesService.updateMaintenanceRecord(
      req,
      id,
      body,
      image,
    );
  }
}
