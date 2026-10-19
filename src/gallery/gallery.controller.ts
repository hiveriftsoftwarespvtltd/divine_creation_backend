import { 
  Controller, 
  Get, 
  Post, 
  Delete, 
  Body, 
  Param, 
  UseGuards, 
  UseInterceptors, 
  UploadedFile, 
  Req 
} from '@nestjs/common';
import { GalleryService } from './gallery.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { Request } from 'express';
import { createStorageOptions, cleanImageUrl } from '../common/upload.config';

// Multer storage configuration for gallery image
const storageOptions = createStorageOptions('gallery');

@Controller('gallery')
export class GalleryController {
  constructor(private readonly galleryService: GalleryService) {}

  @Get()
  async findAll() {
    return this.galleryService.findAll();
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('image', { storage: storageOptions }))
  async create(
    @Body() body: any,
    @UploadedFile() file: any,
    @Req() req: Request,
  ) {
    let imageUrl = cleanImageUrl(body.image || '');
    if (file) {
      imageUrl = `/uploads/${file.filename}`;
    }

    return this.galleryService.create({
      image: imageUrl,
      category: body.category || 'Others',
    });
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async remove(@Param('id') id: string) {
    return this.galleryService.remove(id);
  }
}
