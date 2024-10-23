import { Injectable } from '@nestjs/common';
import { join } from 'path';
import { promises as fs } from 'fs';

@Injectable()
export class PicturesService {
  // Get picture by name
  async getPictureByName(name: string) {
    const filePath = join(process.cwd(), 'uploads', name);
    return await fs.readFile(filePath);
  }
}
