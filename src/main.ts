import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { existsSync, mkdirSync } from 'fs';
import { getConnectionToken } from '@nestjs/mongoose';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Ensure the uploads directory exists
  const uploadsDir = existsSync(join(process.cwd(), 'uploads'))
    ? join(process.cwd(), 'uploads')
    : join(__dirname, '..', 'uploads');
  if (!existsSync(uploadsDir)) {
    mkdirSync(uploadsDir, { recursive: true });
    console.log(`[Bootstrap] Created uploads directory at: ${uploadsDir}`);
  }

  // Proxy fallback: If an uploaded image is missing locally, auto-fetch & cache from live production server
  app.use(['/uploads', '/api/uploads', '/api/v1/uploads'], (req: any, res: any, next: any) => {
    const rawPath = req.path || '';
    const filename = rawPath.replace(/^\/+/, '').split('?')[0];
    if (!filename) return next();

    const localFilePath = join(uploadsDir, filename);
    if (existsSync(localFilePath)) {
      return next();
    }

    const https = require('https');
    const { createWriteStream } = require('fs');
    const remoteUrl = `https://divinecreations.co.in/api/v1/uploads/${encodeURIComponent(filename)}`;

    https.get(remoteUrl, (remoteRes: any) => {
      if (remoteRes.statusCode === 200) {
        const fileStream = createWriteStream(localFilePath);
        remoteRes.pipe(fileStream);
        res.setHeader('Content-Type', remoteRes.headers['content-type'] || 'image/jpeg');
        remoteRes.pipe(res);
      } else {
        next();
      }
    }).on('error', () => {
      next();
    });
  });

  // Serve static files from the uploads directory at /uploads, /api/uploads, and /api/v1/uploads
  app.useStaticAssets(uploadsDir, {
    prefix: '/uploads',
  });
  app.useStaticAssets(uploadsDir, {
    prefix: '/api/uploads',
  });
  app.useStaticAssets(uploadsDir, {
    prefix: '/api/v1/uploads',
  });

  // Global prefix
  app.setGlobalPrefix('api/v1');

  // CORS
  const defaultAllowedOrigins = [
    'http://localhost:5173',
    'http://localhost:3000',
    'http://127.0.0.1:5173',
    'https://divinecreations.co.in',
    'https://www.divinecreations.co.in',
    'http://divinecreations.co.in',
    'http://www.divinecreations.co.in',
  ];
  const envOrigins = process.env.ALLOWED_ORIGINS?.split(',').map(o => o.trim()) || [];
  const allowedOrigins = Array.from(new Set([...defaultAllowedOrigins, ...envOrigins]));

  app.enableCors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps, curl, Postman)
      if (!origin) return callback(null, true);
      const cleanOrigin = origin.replace(/\/$/, '');
      if (
        allowedOrigins.includes('*') ||
        allowedOrigins.includes(cleanOrigin) ||
        allowedOrigins.includes(origin) ||
        cleanOrigin.endsWith('.divinecreations.co.in') ||
        cleanOrigin === 'https://divinecreations.co.in' ||
        cleanOrigin.startsWith('http://192.168.') ||
        cleanOrigin.startsWith('http://10.') ||
        cleanOrigin.startsWith('http://172.') ||
        cleanOrigin.includes('localhost') ||
        cleanOrigin.includes('127.0.0.1')
      ) {
        return callback(null, true);
      }
      return callback(new Error(`CORS: origin ${origin} not allowed`), false);
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept', 'Origin', 'X-Requested-With'],
    credentials: true,
    preflightContinue: false,
    optionsSuccessStatus: 204,
  });

  // Validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: false,
      transform: true,
    }),
  );

  const port = process.env.PORT || 9003;
  await app.listen(port);
  console.log(` Divine Creations Backend running on: http://localhost:${port}/api/v1`);

  // Drop the old slug index from MongoDB if it exists (fixes E11000 duplicate key error for slug: null)
  try {
    const connection = app.get(getConnectionToken()) as any;
    await connection.collection('products').dropIndex('slug_1');
  } catch (err) {
    // Index already dropped or doesn't exist
  }
}

bootstrap();
