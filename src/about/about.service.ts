import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Content } from '../content/schemas/content.schema';
import { existsSync, copyFileSync, mkdirSync } from 'fs';
import { join } from 'path';

export const DEFAULT_ABOUT = {
  overview: {
    badge: 'ABOUT DIVINE CREATIONS',
    title: 'Traditional Indian Craftsmanship',
    titleHighlight: 'Modern Design',
    description:
      'Established in 2007 in New Delhi under Director M Ahuja, Divine Creations is a premier manufacturer, trader, and exporter of Corporate & Promotional Gift Items, Executive Gift Sets, Stainless Steel Flasks, Executive Notebooks, Trophy Mementos, and Custom Homeware.',
    image: '/uploads/about_corporate_gifting_craft.jpg',
    buttonText: 'KNOW OUR STORY',
    buttonLink: '/about',
    highlights: [
      { title: '16+ Years', subtitle: 'Experience', icon: 'clock' },
      { title: 'GST Registered', subtitle: 'Proprietorship', icon: 'shield' },
      { title: 'Trusted', subtitle: 'Manufacturer', icon: 'users' },
      { title: 'Corporate', subtitle: 'Gifting Sets', icon: 'gift' },
    ],
  },
  manufacturing: {
    badge: 'ADVANCED MANUFACTURING & BRANDING',
    title: 'Precision Branding',
    titleSub: 'For Corporate Gifts',
    description:
      'Equipped with Laser Engraving, Metal Marking, Chemical Etching, and Glass Sand Carving machinery at Badli Industrial Estate, Divine Creations transforms your concepts and company logos into executive corporate gifts with high demographic impact.',
    buttonText: 'SEE OUR PROCESS',
    buttonLink: '/custom-order',
    cards: [
      {
        tag: 'Fiber Laser Marking',
        title: 'Custom Laser Engraved Bottles',
        linkText: 'Click to View Catalog →',
        category: 'Drinkware',
        image: '/uploads/laser_engraving_corporate_gifting.jpg',
      },
      {
        tag: '',
        title: 'Metal Trophies',
        linkText: 'View Items →',
        category: 'Mementos & Trophies',
        image: '/uploads/metal_etching_trophy_crafting.jpg',
      },
      {
        tag: '',
        title: 'Leatherette Diaries',
        linkText: 'View Items →',
        category: 'Gift Sets & Notebooks',
        image: '/uploads/leatherette_gifting_embossing.jpg',
      },
      {
        tag: 'Executive Gift Combo',
        title: 'Corporate Gift Sets',
        linkText: 'Click to View Catalog →',
        category: 'Corporate Gifts',
        image: '/uploads/executive_drinkware_set.jpg',
      },
    ],
  },
};

@Injectable()
export class AboutService implements OnModuleInit {
  constructor(@InjectModel(Content.name) private contentModel: Model<Content>) {}

  async onModuleInit() {
    await this.ensureDefaultAssets();
    await this.findOrCreate();
  }

  private async ensureDefaultAssets() {
    try {
      const uploadsDir = join(__dirname, '..', '..', 'uploads');
      if (!existsSync(uploadsDir)) {
        mkdirSync(uploadsDir, { recursive: true });
      }

      const frontendAssetsDir = join(__dirname, '..', '..', '..', 'frontend', 'src', 'assets');
      const filesToCopy = [
        'about_corporate_gifting_craft.jpg',
        'laser_engraving_corporate_gifting.jpg',
        'metal_etching_trophy_crafting.jpg',
        'leatherette_gifting_embossing.jpg',
        'executive_drinkware_set.jpg',
      ];

      for (const f of filesToCopy) {
        const destPath = join(uploadsDir, f);
        const srcPath = join(frontendAssetsDir, f);
        if (!existsSync(destPath) && existsSync(srcPath)) {
          copyFileSync(srcPath, destPath);
          console.log(`[AboutService] Copied default asset ${f} to uploads.`);
        }
      }
    } catch (err) {
      console.warn('[AboutService] Could not auto-copy frontend assets:', err.message);
    }
  }

  async findOrCreate(): Promise<any> {
    let content = await this.contentModel.findOne().exec();
    if (!content) {
      content = new this.contentModel({ about: DEFAULT_ABOUT });
      await content.save();
      console.log('[AboutService] Initialized Content and seeded default About data.');
      return content.about;
    }

    if (!content.about || !content.about.overview) {
      content.about = JSON.parse(JSON.stringify(DEFAULT_ABOUT));
      content.markModified('about');
      await content.save();
      console.log('[AboutService] Seeded default About data into existing Content document.');
    }

    return content.about;
  }

  async updateAbout(updateData: any, uploadedFiles?: Record<string, Express.Multer.File[]>): Promise<any> {
    let content = await this.contentModel.findOne().exec();
    if (!content) {
      content = new this.contentModel({ about: DEFAULT_ABOUT });
    }

    const currentAbout = content.about || JSON.parse(JSON.stringify(DEFAULT_ABOUT));

    // Parse JSON fields if passed as string via multipart form
    let parsedOverview = updateData.overview;
    if (typeof parsedOverview === 'string') {
      try {
        parsedOverview = JSON.parse(parsedOverview);
      } catch (e) {}
    }

    let parsedManufacturing = updateData.manufacturing;
    if (typeof parsedManufacturing === 'string') {
      try {
        parsedManufacturing = JSON.parse(parsedManufacturing);
      } catch (e) {}
    }

    if (parsedOverview) {
      if (!currentAbout.overview) currentAbout.overview = {};
      if (parsedOverview.badge !== undefined) currentAbout.overview.badge = parsedOverview.badge;
      if (parsedOverview.title !== undefined) currentAbout.overview.title = parsedOverview.title;
      if (parsedOverview.titleHighlight !== undefined) currentAbout.overview.titleHighlight = parsedOverview.titleHighlight;
      if (parsedOverview.description !== undefined) currentAbout.overview.description = parsedOverview.description;
      if (parsedOverview.buttonText !== undefined) currentAbout.overview.buttonText = parsedOverview.buttonText;
      if (parsedOverview.buttonLink !== undefined) currentAbout.overview.buttonLink = parsedOverview.buttonLink;
      if (parsedOverview.image !== undefined) currentAbout.overview.image = parsedOverview.image;
      if (Array.isArray(parsedOverview.highlights)) currentAbout.overview.highlights = parsedOverview.highlights;
    }

    if (parsedManufacturing) {
      if (!currentAbout.manufacturing) currentAbout.manufacturing = {};
      if (parsedManufacturing.badge !== undefined) currentAbout.manufacturing.badge = parsedManufacturing.badge;
      if (parsedManufacturing.title !== undefined) currentAbout.manufacturing.title = parsedManufacturing.title;
      if (parsedManufacturing.titleSub !== undefined) currentAbout.manufacturing.titleSub = parsedManufacturing.titleSub;
      if (parsedManufacturing.description !== undefined) currentAbout.manufacturing.description = parsedManufacturing.description;
      if (parsedManufacturing.buttonText !== undefined) currentAbout.manufacturing.buttonText = parsedManufacturing.buttonText;
      if (parsedManufacturing.buttonLink !== undefined) currentAbout.manufacturing.buttonLink = parsedManufacturing.buttonLink;
      if (Array.isArray(parsedManufacturing.cards)) {
        currentAbout.manufacturing.cards = parsedManufacturing.cards;
      }
    }

    // Attach uploaded files
    if (uploadedFiles) {
      if (uploadedFiles['overviewImage']?.[0]) {
        currentAbout.overview.image = `/uploads/${uploadedFiles['overviewImage'][0].filename}`;
      }

      if (!currentAbout.manufacturing.cards) {
        currentAbout.manufacturing.cards = [];
      }

      for (let i = 0; i < 4; i++) {
        const fileKey = `card${i}Image`;
        if (uploadedFiles[fileKey]?.[0]) {
          if (!currentAbout.manufacturing.cards[i]) {
            currentAbout.manufacturing.cards[i] = {
              tag: '',
              title: '',
              linkText: '',
              category: '',
              image: '',
            };
          }
          currentAbout.manufacturing.cards[i].image = `/uploads/${uploadedFiles[fileKey][0].filename}`;
        }
      }
    }

    content.about = currentAbout;
    content.markModified('about');
    await content.save();
    return content.about;
  }

  async resetToDefault(): Promise<any> {
    const content = await this.contentModel.findOne().exec();
    if (content) {
      content.about = JSON.parse(JSON.stringify(DEFAULT_ABOUT));
      content.markModified('about');
      await content.save();
      return content.about;
    }
    return DEFAULT_ABOUT;
  }
}
