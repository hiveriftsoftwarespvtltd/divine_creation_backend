import { 
  Controller, 
  Get, 
  Post, 
  Patch, 
  Delete,
  Body, 
  Param, 
  UseGuards, 
  UseInterceptors, 
  UploadedFile, 
  Req 
} from '@nestjs/common';
import { EnquiriesService } from './enquiries.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { Request } from 'express';
import { createStorageOptions, cleanImageUrl } from '../common/upload.config';

// Multer storage configuration for enquiry attachment
const storageOptions = createStorageOptions('enquiry');

@Controller('enquiries')
export class EnquiriesController {
  constructor(private readonly enquiriesService: EnquiriesService) {}

  @Post()
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

    return this.enquiriesService.create({
      name: body.name,
      phone: body.phone,
      email: body.email || '',
      subject: body.subject,
      message: body.message || '',
      image: imageUrl,
    });
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async findAll() {
    return this.enquiriesService.findAll();
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  async updateStatus(@Param('id') id: string, @Body() body: { status: string }) {
    return this.enquiriesService.updateStatus(id, body.status);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async remove(@Param('id') id: string) {
    await this.enquiriesService.remove(id);
    return { success: true };
  }
}
