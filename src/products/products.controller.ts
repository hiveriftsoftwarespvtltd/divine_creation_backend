import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Query,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  UploadedFiles,
  Req,
  InternalServerErrorException,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { Request } from 'express';
import { createStorageOptions, cleanImageUrl } from '../common/upload.config';

// Multer storage configuration
const storageOptions = createStorageOptions('prod');

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  async findAll(@Query('category') category?: string) {
    return this.productsService.findAll(category);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.productsService.findOne(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileFieldsInterceptor([
    { name: 'image', maxCount: 1 },
    { name: 'images', maxCount: 8 }
  ], { storage: storageOptions }))
  async create(
    @Body() body: any,
    @UploadedFiles() files: { image?: any[], images?: any[] },
    @Req() req: Request,
  ) {
    try {
      let imageUrl = cleanImageUrl(body.image || '');
      if (files?.image?.[0]) {
        imageUrl = `/uploads/${files.image[0].filename}`;
      }

      let galleryUrls: string[] = [];
      if (files?.images) {
        galleryUrls = files.images.map(f => `/uploads/${f.filename}`);
      } else if (body.images) {
        if (typeof body.images === 'string') {
          try {
            galleryUrls = JSON.parse(body.images);
          } catch (e) {
            galleryUrls = body.images.split(',').map((u) => u.trim()).filter(Boolean);
          }
        } else {
          galleryUrls = body.images;
        }
      }
      galleryUrls = (galleryUrls || []).map(u => cleanImageUrl(u));

      // If main cover imageUrl is empty, fallback to the first gallery image
      if (!imageUrl && galleryUrls.length > 0) {
        imageUrl = galleryUrls[0];
      }

      let tagsArray = body.tags || [];
      if (typeof tagsArray === 'string') {
        try {
          tagsArray = JSON.parse(tagsArray);
        } catch (e) {
          tagsArray = tagsArray.split(',').map((t) => t.trim()).filter(Boolean);
        }
      }

      const isFeatured = body.featured === 'true' || body.featured === true;
      const isOurProduct = body.isOurProduct === 'true' || body.isOurProduct === true || body.ourProduct === 'true' || body.ourProduct === true;

      return await this.productsService.create({
        title: body.title,
        description: body.description || '',
        material: body.material,
        type: body.type,
        image: imageUrl,
        images: galleryUrls,
        tags: tagsArray,
        category: body.category || '',
        finish: body.finish !== undefined ? body.finish : 'Marble Dust White, Gold Leaf, Antique Bronze',
        sizes: body.sizes !== undefined ? body.sizes : '2 ft to 12 ft',
        brand: body.brand !== undefined ? body.brand : 'Divine Creations',
        weatherproof: body.weatherproof !== undefined ? body.weatherproof : 'Yes (Rain & UV Resistant)',
        featured: isFeatured,
        isOurProduct: isOurProduct
      });
    } catch (error) {
      console.error('[ProductsController] Error creating product:', error);
      throw new InternalServerErrorException({
        message: error.message,
        stack: error.stack,
        details: error,
      });
    }
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileFieldsInterceptor([
    { name: 'image', maxCount: 1 },
    { name: 'images', maxCount: 8 }
  ], { storage: storageOptions }))
  async update(
    @Param('id') id: string,
    @Body() body: any,
    @UploadedFiles() files: { image?: any[], images?: any[] },
    @Req() req: Request,
  ) {
    try {
      const updateData: any = {
        title: body.title,
        material: body.material,
        type: body.type,
        category: body.category,
      };

      if (body.description !== undefined) updateData.description = body.description;
      if (body.finish !== undefined) updateData.finish = body.finish;
      if (body.sizes !== undefined) updateData.sizes = body.sizes;
      if (body.brand !== undefined) updateData.brand = body.brand;
      if (body.weatherproof !== undefined) updateData.weatherproof = body.weatherproof;
      if (body.featured !== undefined) {
        updateData.featured = body.featured === 'true' || body.featured === true;
      }
      if (body.isOurProduct !== undefined || body.ourProduct !== undefined) {
        const ourProdVal = body.isOurProduct !== undefined ? body.isOurProduct : body.ourProduct;
        updateData.isOurProduct = ourProdVal === 'true' || ourProdVal === true;
      }

      if (files?.image?.[0]) {
        updateData.image = `/uploads/${files.image[0].filename}`;
      } else if (body.image) {
        updateData.image = cleanImageUrl(body.image);
      }

      let galleryUrls: string[] = [];
      if (files?.images) {
        galleryUrls = files.images.map(f => `/uploads/${f.filename}`);
        updateData.images = galleryUrls;
      } else if (body.images) {
        if (typeof body.images === 'string') {
          try {
            galleryUrls = JSON.parse(body.images);
          } catch (e) {
            galleryUrls = body.images.split(',').map((u) => u.trim()).filter(Boolean);
          }
        } else {
          galleryUrls = body.images;
        }
        updateData.images = (galleryUrls || []).map(u => cleanImageUrl(u));
      }

      if (!updateData.image && galleryUrls.length > 0) {
        updateData.image = galleryUrls[0];
      }

      if (body.tags) {
        let tagsArray = body.tags;
        if (typeof tagsArray === 'string') {
          try {
            tagsArray = JSON.parse(tagsArray);
          } catch (e) {
            tagsArray = tagsArray.split(',').map((t) => t.trim()).filter(Boolean);
          }
        }
        updateData.tags = tagsArray;
      }

      return await this.productsService.update(id, updateData);
    } catch (error) {
      console.error('[ProductsController] Error updating product:', error);
      throw new InternalServerErrorException({
        message: error.message,
        stack: error.stack,
        details: error,
      });
    }
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async remove(@Param('id') id: string) {
    return this.productsService.remove(id);
  }
}
