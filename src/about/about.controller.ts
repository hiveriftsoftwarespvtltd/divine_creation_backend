import {
  Controller,
  Get,
  Put,
  Post,
  Body,
  UseGuards,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { AboutService } from './about.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { createStorageOptions } from '../common/upload.config';

const storageOptions = createStorageOptions('about');

@Controller('about')
export class AboutController {
  constructor(private readonly aboutService: AboutService) {}

  @Get()
  async getAbout() {
    return this.aboutService.findOrCreate();
  }

  @Put()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'overviewImage', maxCount: 1 },
        { name: 'card0Image', maxCount: 1 },
        { name: 'card1Image', maxCount: 1 },
        { name: 'card2Image', maxCount: 1 },
        { name: 'card3Image', maxCount: 1 },
      ],
      { storage: storageOptions },
    ),
  )
  async updateAbout(
    @Body() body: any,
    @UploadedFiles()
    files: {
      overviewImage?: Express.Multer.File[];
      card0Image?: Express.Multer.File[];
      card1Image?: Express.Multer.File[];
      card2Image?: Express.Multer.File[];
      card3Image?: Express.Multer.File[];
    },
  ) {
    return this.aboutService.updateAbout(body, files);
  }

  @Post('reset')
  @UseGuards(JwtAuthGuard)
  async resetToDefault() {
    return this.aboutService.resetToDefault();
  }
}
