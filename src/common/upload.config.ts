import { existsSync, mkdirSync, copyFileSync, readdirSync } from 'fs';
import { join, extname } from 'path';
import { diskStorage } from 'multer';

/**
 * Single source of truth for the uploads directory.
 * Supports configurable UPLOAD_DIR via environment variable for persistent storage outside git working tree.
 */
export function getUploadsDir(): string {
  const custom = process.env.UPLOAD_DIR;
  if (custom && custom.trim()) {
    const resolved = custom.trim();
    if (!existsSync(resolved)) {
      mkdirSync(resolved, { recursive: true });
    }
    return resolved;
  }

  const cwdPath = join(process.cwd(), 'uploads');
  if (existsSync(cwdPath)) {
    return cwdPath;
  }

  const relativePath = join(__dirname, '..', '..', 'uploads');
  if (!existsSync(relativePath)) {
    mkdirSync(relativePath, { recursive: true });
  }
  return relativePath;
}

/**
 * Automatically seeds default core assets into uploads directory on server startup/restart.
 * Guarantees that hero banners, sliders, and critical brand assets are never missing or broken.
 */
export function seedCoreAssets(targetDir: string) {
  try {
    const candidateDirs = [
      join(process.cwd(), 'seed-assets'),
      join(__dirname, '..', '..', 'seed-assets'),
      join(__dirname, '..', 'seed-assets'),
    ];

    let seedDir = '';
    for (const d of candidateDirs) {
      if (existsSync(d)) {
        seedDir = d;
        break;
      }
    }

    if (!seedDir) return;

    if (!existsSync(targetDir)) {
      mkdirSync(targetDir, { recursive: true });
    }

    const files = readdirSync(seedDir);
    let count = 0;
    for (const file of files) {
      const dest = join(targetDir, file);
      if (!existsSync(dest)) {
        copyFileSync(join(seedDir, file), dest);
        count++;
      }
    }
    if (count > 0) {
      console.log(`[SeedAssets] Restored ${count} default core assets into uploads directory.`);
    }
  } catch (err) {
    console.warn('[SeedAssets] Warning while restoring seed assets:', err.message);
  }
}

/**
 * Helper to strip any localhost origins (e.g. http://localhost:5007) from an image URL
 * to ensure that only clean relative paths (e.g. /uploads/image.png) or valid public URLs are saved to MongoDB.
 */
export function cleanImageUrl(url: any): string {
  if (typeof url !== 'string' || !url) return '';
  const trimmed = url.trim();
  const localhostMatch = trimmed.match(/^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?(\/uploads\/.*)$/i);
  if (localhostMatch && localhostMatch[3]) {
    return localhostMatch[3];
  }
  return trimmed;
}

/**
 * Standard diskStorage options for Multer with consistent destination.
 */
export const createStorageOptions = (prefix = '') =>
  diskStorage({
    destination: (req, file, callback) => {
      const dir = getUploadsDir();
      callback(null, dir);
    },
    filename: (req, file, callback) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      const pfx = prefix ? `${prefix}-` : '';
      callback(null, `${pfx}${uniqueSuffix}${extname(file.originalname)}`);
    },
  });
