import { Controller, Get, Put, Body, UseGuards, UseInterceptors, UploadedFiles, Req } from '@nestjs/common';
import { ContentService } from './content.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname, join } from 'path';
import { Request } from 'express';

import { existsSync, mkdirSync } from 'fs';

const uploadsDir = existsSync(join(process.cwd(), 'uploads'))
  ? join(process.cwd(), 'uploads')
  : join(__dirname, '..', '..', 'uploads');

if (!existsSync(uploadsDir)) {
  mkdirSync(uploadsDir, { recursive: true });
}

const storageOptions = diskStorage({
  destination: (req, file, callback) => {
    callback(null, uploadsDir);
  },
  filename: (req, file, callback) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    callback(null, `hero-${uniqueSuffix}${extname(file.originalname)}`);
  },
});

@Controller('content')
export class ContentController {
  constructor(private readonly contentService: ContentService) {}

  @Get()
  async find() {
    return this.contentService.findOrCreate();
  }

  @Put()
  @UseGuards(JwtAuthGuard)
  async update(@Body() updateDto: any) {
    return this.contentService.update(updateDto);
  }

  @Put('hero')
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
  async updateHero(
    @Body() body: any,
    @UploadedFiles()
    files: { image?: Express.Multer.File[]; mobileImage?: Express.Multer.File[] },
    @Req() req: Request,
  ) {
    const pageKey = body.pageKey || 'home';
    const heroData: any = {
      title: body.title,
      subtitle: body.subtitle,
    };

    if (files?.image?.[0]) {
      heroData.image = `/uploads/${files.image[0].filename}`;
    } else if (body.image !== undefined) {
      heroData.image = body.image;
    }

    if (files?.mobileImage?.[0]) {
      heroData.mobileImage = `/uploads/${files.mobileImage[0].filename}`;
    } else if (body.mobileImage !== undefined) {
      heroData.mobileImage = body.mobileImage;
    }

    return this.contentService.updateHero(pageKey, heroData);
  }

  @Get('socials')
  async getSocials() {
    return this.contentService.getSocials();
  }

  @Put('socials')
  @UseGuards(JwtAuthGuard)
  async updateSocials(@Body() body: any) {
    return this.contentService.updateSocials(body);
  }
}

@Controller('socials')
export class SocialsController {
  constructor(private readonly contentService: ContentService) {}

  @Get()
  async getSocials() {
    return this.contentService.getSocials();
  }

  @Put()
  @UseGuards(JwtAuthGuard)
  async updateSocials(@Body() body: any) {
    return this.contentService.updateSocials(body);
  }
}

