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
import { ClientsService } from './clients.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { Request } from 'express';
import { createStorageOptions, cleanImageUrl } from '../common/upload.config';

// Multer storage configuration for client logo
const storageOptions = createStorageOptions('logo');

@Controller('clients')
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  @Get()
  async findAll() {
    return this.clientsService.findAll();
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('logo', { storage: storageOptions }))
  async create(
    @Body() body: any,
    @UploadedFile() file: any,
    @Req() req: Request,
  ) {
    let logoUrl = cleanImageUrl(body.logo || '');
    if (file) {
      logoUrl = `/uploads/${file.filename}`;
    }

    return this.clientsService.create(body.name || 'Unnamed Client', logoUrl);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async remove(@Param('id') id: string) {
    await this.clientsService.remove(id);
    return { success: true };
  }
}
