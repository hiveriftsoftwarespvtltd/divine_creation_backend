import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Content } from '../content/schemas/content.schema';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class BlogsService {
  constructor(@InjectModel(Content.name) private contentModel: Model<Content>) {}

  private async getContentDoc(): Promise<Content> {
    let content = await this.contentModel.findOne().exec();
    if (!content) {
      content = new this.contentModel({});
      await content.save();
    }
    if (!content.blogs) {
      content.blogs = [];
    }
    return content;
  }

  async findActive(): Promise<any[]> {
    const content = await this.getContentDoc();
    const activeBlogs = (content.blogs || []).filter((b: any) => b.active !== false);
    return activeBlogs;
  }

  async findAll(): Promise<any[]> {
    const content = await this.getContentDoc();
    return content.blogs || [];
  }

  async findOne(id: string): Promise<any> {
    const content = await this.getContentDoc();
    const blog = (content.blogs || []).find((b: any) => (b._id || b.id) === id);
    if (!blog) {
      throw new NotFoundException('Blog article not found');
    }
    return blog;
  }

  async create(createDto: any): Promise<any> {
    const content = await this.getContentDoc();
    const newId = uuidv4();
    const newBlog = {
      _id: newId,
      id: newId,
      title: createDto.title || 'Untitled Article',
      date: createDto.date || new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
      image: createDto.image || '',
      description: createDto.description || '',
      link: createDto.link || '#',
      active: createDto.active !== false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    content.blogs = [newBlog, ...(content.blogs || [])];
    content.markModified('blogs');
    await content.save();

    return newBlog;
  }

  async update(id: string, updateDto: any): Promise<any> {
    const content = await this.getContentDoc();
    const blogIndex = (content.blogs || []).findIndex((b: any) => (b._id || b.id) === id);
    if (blogIndex === -1) {
      throw new NotFoundException('Blog article not found');
    }

    const existing = content.blogs[blogIndex];
    const updated = {
      ...existing,
      ...updateDto,
      updatedAt: new Date().toISOString(),
    };

    content.blogs[blogIndex] = updated;
    content.markModified('blogs');
    await content.save();

    return updated;
  }

  async remove(id: string): Promise<any> {
    const content = await this.getContentDoc();
    const initialLength = (content.blogs || []).length;
    content.blogs = (content.blogs || []).filter((b: any) => (b._id || b.id) !== id);

    if (content.blogs.length === initialLength) {
      throw new NotFoundException('Blog article not found');
    }

    content.markModified('blogs');
    await content.save();

    return { success: true, message: 'Article removed successfully' };
  }
}
