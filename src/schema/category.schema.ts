import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CategoryDocument = Category & Document;

@Schema()
export class Category extends Document {
  @Prop({ unique: true, index: true })
  name: string;

  @Prop({ default: false, index: true })
  private: boolean;

  @Prop({ default: 0 })
  articleCount: number;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
