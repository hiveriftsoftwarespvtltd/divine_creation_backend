import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type BlogDocument = Blog & Document;

@Schema({ timestamps: true })
export class Blog {
  @Prop({ required: true })
  title: string;

  @Prop({ default: '' })
  date: string;

  @Prop({ required: true })
  image: string;

  @Prop({ default: '' })
  description: string;

  @Prop({ default: '#' })
  link: string;

  @Prop({ default: true })
  active: boolean;
}

export const BlogSchema = SchemaFactory.createForClass(Blog);
