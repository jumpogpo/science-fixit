import { Controller, Get, Param, Res } from '@nestjs/common';
import { PicturesService } from './pictures.service';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Pictures')
@Controller('pictures')
export class PicturesController {
  constructor(private readonly picturesService: PicturesService) {}

  // Get picture by name
  @Get(':name')
  @ApiOperation({ summary: 'Get picture by name' })
  @ApiParam({
    name: 'name',
    required: true,
    type: 'string',
    description: 'Picture name',
  })
  @ApiResponse({
    status: 200,
    description: 'Return picture',
  })
  @ApiResponse({ status: 404, description: 'File not found' })
  async getPictureByName(@Param('name') name: string, @Res() res) {
    try {
      const file = await this.picturesService.getPictureByName(name);
      res.setHeader('Content-Type', 'image/jpeg');
      res.send(file);
    } catch {
      res.status(404).send('File not found');
    }
  }
}
