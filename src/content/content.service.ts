import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Content } from './schemas/content.schema';

@Injectable()
export class ContentService implements OnModuleInit {
  constructor(@InjectModel(Content.name) private contentModel: Model<Content>) {}

  async onModuleInit() {
    await this.findOrCreate();
  }

  async findOrCreate(): Promise<Content> {
    let content = await this.contentModel.findOne().exec();
    if (!content) {
      content = new this.contentModel({});
      await content.save();
      console.log('[ContentService] Seeded default site content successfully.');
    }
    return content;
  }

  async update(updateDto: any): Promise<Content> {
    let content = await this.contentModel.findOne().exec();
    if (!content) {
      content = new this.contentModel(updateDto);
    } else {
      content.set(updateDto);
    }
    return content.save();
  }

  async updateHero(pageKey: string, heroData: { title?: string; subtitle?: string; image?: string; mobileImage?: string }): Promise<Content> {
    let content = await this.findOrCreate();
    const currentHeroes = content.pageHeroes || {};
    const existingHero = currentHeroes[pageKey] || { title: '', subtitle: '', image: '', mobileImage: '' };

    const updatedHero = {
      title: heroData.title !== undefined ? heroData.title : existingHero.title,
      subtitle: heroData.subtitle !== undefined ? heroData.subtitle : existingHero.subtitle,
      image: heroData.image !== undefined ? heroData.image : existingHero.image,
      mobileImage: heroData.mobileImage !== undefined ? heroData.mobileImage : existingHero.mobileImage,
    };

    const newPageHeroes = {
      ...currentHeroes,
      [pageKey]: updatedHero,
    };

    content.pageHeroes = newPageHeroes;
    content.markModified('pageHeroes');
    return content.save();
  }
}
