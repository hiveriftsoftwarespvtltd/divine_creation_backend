import { 
  Controller, 
  Get, 
  Post, 
  Put, 
  Delete, 
  Body, 
  Param, 
  UseGuards, 
  UseInterceptors, 
  UploadedFile, 
  Req 
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { Request } from 'express';
import { createStorageOptions, cleanImageUrl } from '../common/upload.config';

// Multer storage configuration for category image
const storageOptions = createStorageOptions('cat');

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  async findAll() {
    return this.categoriesService.findAll();
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
    return this.categoriesService.create({
      name: body.name,
      featured: body.featured === 'true' || body.featured === true,
      image: imageUrl,
    });
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('image', { storage: storageOptions }))
  async update(
    @Param('id') id: string,
    @Body() body: any,
    @UploadedFile() file: any,
    @Req() req: Request,
  ) {
    const updateData: any = {};
    if (body.name !== undefined) updateData.name = body.name;
    if (body.featured !== undefined) {
      updateData.featured = body.featured === 'true' || body.featured === true;
    }
    if (file) {
      updateData.image = `/uploads/${file.filename}`;
    } else if (body.image !== undefined) {
      updateData.image = cleanImageUrl(body.image);
    }
    return this.categoriesService.update(id, updateData);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async remove(@Param('id') id: string) {
    return this.categoriesService.remove(id);
  }
}
