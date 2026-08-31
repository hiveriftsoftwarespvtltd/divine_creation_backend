import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Product extends Document {
  @Prop({ required: true })
  title: string;

  @Prop({ default: '' })
  description: string;

  @Prop({ default: 'FRP' })
  material: string;

  @Prop({ default: 'Indoor/Outdoor' })
  type: string;

  @Prop({ default: '' })
  image: string;

  @Prop({ type: [String], default: [] })
  images: string[];

  @Prop({ type: [String], default: [] })
  tags: string[];

  @Prop({ default: '' })
  category: string;

  @Prop({ default: 'Marble Dust White, Gold Leaf, Antique Bronze' })
  finish: string;

  @Prop({ default: '2 ft to 12 ft' })
  sizes: string;

  @Prop({ default: 'Divine Creations' })
  brand: string;

  @Prop({ default: 'Yes (Rain & UV Resistant)' })
  weatherproof: string;

  @Prop({ default: false })
  featured: boolean;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
