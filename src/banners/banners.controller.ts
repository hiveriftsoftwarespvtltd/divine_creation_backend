import {
  Controller,
  Get,
  Post,
  Put,
  Patch,
  Delete,
  Param,
  Body,
  UseGuards,
  UseInterceptors,
  UploadedFiles,
  Req,
} from '@nestjs/common';
import { BannersService } from './banners.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname, join } from 'path';
import { Request } from 'express';
import { createStorageOptions, cleanImageUrl } from '../common/upload.config';

const storageOptions = createStorageOptions('banner');

@Controller('banners')
export class BannersController {
  constructor(private readonly bannersService: BannersService) {}

  @Get()
  async findActive() {
    return this.bannersService.findActive();
  }

  @Get('admin')
  @UseGuards(JwtAuthGuard)
  async findAll() {
    return this.bannersService.findAll();
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'image', maxCount: 1 },
        { name: 'mobileImage', maxCount: 1 },
      ],
      { storage: storageOptions },
    ),
  )
  async create(
    @Body() body: any,
    @UploadedFiles()
    files: { image?: Express.Multer.File[]; mobileImage?: Express.Multer.File[] },
    @Req() req: Request,
  ) {
    let imageUrl = cleanImageUrl(body.image || '');
    if (files?.image?.[0]) {
      imageUrl = `/uploads/${files.image[0].filename}`;
    }

    let mobileImageUrl = cleanImageUrl(body.mobileImage || '');
    if (files?.mobileImage?.[0]) {
      mobileImageUrl = `/uploads/${files.mobileImage[0].filename}`;
    }

    return this.bannersService.create({
      title: body.title,
      subtitle: body.subtitle || '',
      pageKey: body.pageKey || 'slider',
      image: imageUrl,
      mobileImage: mobileImageUrl,
      link: body.link || '#',
      active: body.active !== 'false',
    });
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'image', maxCount: 1 },
        { name: 'mobileImage', maxCount: 1 },
      ],
      { storage: storageOptions },
    ),
  )
  async update(
    @Param('id') id: string,
    @Body() body: any,
    @UploadedFiles()
    files: { image?: Express.Multer.File[]; mobileImage?: Express.Multer.File[] },
    @Req() req: Request,
  ) {
    const updateData: any = {};
    if (body.title !== undefined) updateData.title = body.title;
    if (body.subtitle !== undefined) updateData.subtitle = body.subtitle;
    if (body.pageKey !== undefined) updateData.pageKey = body.pageKey;
    if (body.link !== undefined) updateData.link = body.link;
    if (body.active !== undefined) updateData.active = body.active !== 'false';

    if (files?.image?.[0]) {
      updateData.image = `/uploads/${files.image[0].filename}`;
    } else if (body.image) {
      updateData.image = cleanImageUrl(body.image);
    }

    if (files?.mobileImage?.[0]) {
      updateData.mobileImage = `/uploads/${files.mobileImage[0].filename}`;
    } else if (body.mobileImage !== undefined) {
      updateData.mobileImage = cleanImageUrl(body.mobileImage);
    }

    return this.bannersService.update(id, updateData);
  }

  @Patch(':id/toggle')
  @UseGuards(JwtAuthGuard)
  async toggleStatus(@Param('id') id: string) {
    return this.bannersService.toggleStatus(id);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async remove(@Param('id') id: string) {
    return this.bannersService.remove(id);
  }
}
