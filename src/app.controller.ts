import { Controller, Get, Param, Res, HttpStatus } from '@nestjs/common';
import { AppService } from './app.service';
import { Response } from 'express';
import { join } from 'path';
import { existsSync } from 'fs';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): object {
    return this.appService.getHello();
  }

  @Get('health')
  healthCheck(): object {
    return { status: 'OK', timestamp: new Date().toISOString() };
  }

  // Explicit route to guarantee /api/v1/uploads/:filename works even behind cPanel / Nginx reverse proxies
  @Get('uploads/:filename')
  serveUploadFile(@Param('filename') filename: string, @Res() res: Response) {
    const uploadsDir = existsSync(join(process.cwd(), 'uploads'))
      ? join(process.cwd(), 'uploads')
      : join(__dirname, '..', 'uploads');
    
    // Sanitize filename to prevent directory traversal
    const safeFilename = filename.replace(/^(\.\.[\/\\])+/, '');
    const filePath = join(uploadsDir, safeFilename);

    if (existsSync(filePath)) {
      return res.sendFile(filePath);
    }
    return res.status(HttpStatus.NOT_FOUND).json({ message: 'File not found', file: safeFilename });
  }
}

