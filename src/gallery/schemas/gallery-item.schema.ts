import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class GalleryItem extends Document {
  @Prop({ required: true })
  image: string;

  @Prop({ required: true })
  category: string; // Corporate Gifts, Drinkware & Flasks, Gift Sets & Notebooks, Mementos & Trophies, Wall Clocks, Desktop Collection, Others
}

export const GalleryItemSchema = SchemaFactory.createForClass(GalleryItem);
