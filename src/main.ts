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

  // Serve static files from the uploads directory at /uploads
  app.useStaticAssets(uploadsDir, {
    prefix: '/uploads',
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
