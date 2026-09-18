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
import { diskStorage } from 'multer';
import { extname, join } from 'path';

const storageOptions = diskStorage({
  destination: join(__dirname, '..', '..', 'uploads'),
  filename: (req, file, callback) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    callback(null, `about-${file.fieldname}-${uniqueSuffix}${extname(file.originalname)}`);
  },
});

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
