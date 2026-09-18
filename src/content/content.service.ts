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

  async getSocials(): Promise<Record<string, string>> {
    const content = await this.findOrCreate();
    const defaults: Record<string, string> = {
      facebook: '',
      instagram: '',
      youtube: '',
      whatsapp: '',
      whatsappNumber: '',
    };

    const current = (content.socialLinks && typeof content.socialLinks === 'object' && !Array.isArray(content.socialLinks))
      ? content.socialLinks
      : {};

    const merged = {
      facebook: current.facebook || '',
      instagram: current.instagram || '',
      youtube: current.youtube || '',
      whatsapp: current.whatsapp || '',
      whatsappNumber: current.whatsappNumber || '',
    };

    return merged;
  }

  async updateSocials(socialData: Record<string, string>): Promise<Record<string, string>> {
    const content = await this.findOrCreate();
    const current = await this.getSocials();
    const updated = {
      facebook: socialData.facebook !== undefined ? socialData.facebook.trim() : (current.facebook || ''),
      instagram: socialData.instagram !== undefined ? socialData.instagram.trim() : (current.instagram || ''),
      youtube: socialData.youtube !== undefined ? socialData.youtube.trim() : (current.youtube || ''),
      whatsapp: socialData.whatsapp !== undefined ? socialData.whatsapp.trim() : (current.whatsapp || ''),
      whatsappNumber: socialData.whatsappNumber !== undefined ? socialData.whatsappNumber.trim() : (current.whatsappNumber || ''),
    };
    content.socialLinks = updated;
    content.markModified('socialLinks');
    await content.save();
    return updated;
  }
}

