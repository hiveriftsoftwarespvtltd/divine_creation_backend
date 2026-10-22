import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { existsSync, mkdirSync, createWriteStream } from 'fs';
import { getConnectionToken } from '@nestjs/mongoose';
import { getUploadsDir, seedCoreAssets } from './common/upload.config';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Ensure the uploads directory exists (supports custom UPLOAD_DIR via env)
  const uploadsDir = getUploadsDir();
  console.log(`[Bootstrap] Using uploads directory at: ${uploadsDir}`);

  // Automatically seed and restore core assets (hero banners, sliders, brand logos)
  seedCoreAssets(uploadsDir);

  // Safe fallback for local development only:
  // If an uploaded image is missing locally, auto-fetch & cache from live server.
  // NEVER run this proxy on the production server itself to avoid recursive self-request deadlocks!
  app.use(['/uploads', '/api/uploads', '/api/v1/uploads'], (req: any, res: any, next: any) => {
    const rawPath = req.path || '';
    const filename = rawPath.replace(/^\/+/, '').split('?')[0];
    if (!filename) return next();

    const localFilePath = join(uploadsDir, filename);
    if (existsSync(localFilePath)) {
      return next();
    }

    // CRITICAL: If running on production server or request host is divinecreations, DO NOT self-fetch!
    const hostname = String(req.hostname || req.headers.host || '').toLowerCase();
    const isProductionLive =
      hostname.includes('divinecreations.co.in') ||
      req.headers['x-fallback-fetch'] === 'true' ||
      process.env.IS_LIVE_SERVER === 'true';

    if (isProductionLive) {
      return next(); // Return 404 cleanly via static assets handler without hanging
    }

    const https = require('https');

    const tryFetch = (url: string, fallback: () => void) => {
      const options = {
        headers: {
          'User-Agent': 'DivineCreations-LocalDev/1.0',
          'x-fallback-fetch': 'true',
        },
        timeout: 5000,
      };

      const request = https.get(url, options, (remoteRes: any) => {
        if (remoteRes.statusCode === 200) {
          try {
            const fileStream = createWriteStream(localFilePath);
            fileStream.on('error', (err: any) => console.error('[UploadFallback] File stream error:', err));
            remoteRes.pipe(fileStream);
            res.setHeader('Content-Type', remoteRes.headers['content-type'] || 'image/jpeg');
            remoteRes.pipe(res);
          } catch (e) {
            console.error('[UploadFallback] Stream error:', e);
            fallback();
          }
        } else {
          fallback();
        }
      });

      request.on('error', () => {
        fallback();
      });

      request.on('timeout', () => {
        request.destroy();
        fallback();
      });
    };

    const primaryUrl = `https://api.divinecreations.co.in/uploads/${encodeURIComponent(filename)}`;
    const secondaryUrl = `https://divinecreations.co.in/api/v1/uploads/${encodeURIComponent(filename)}`;

    tryFetch(primaryUrl, () => {
      tryFetch(secondaryUrl, () => {
        next();
      });
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
