import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import getCurrentTime from '../utils/getCurrentTime';

export type ArticleDucoment = Article & Document;

@Schema()
export class Article extends Document {
  @Prop({ index: true })
  title: string;

  @Prop({ default: '' })
  content: string;

  @Prop({ index: true })
  category: string;

  @Prop({ default: false, index: true })
  hidden: boolean;

  @Prop({ default: '', index: true, unique: true })
  path: string;

  @Prop({
    index: true,
    default: () => {
      return getCurrentTime();
    },
  })
  createdAt: string;

  @Prop({
    index: true,
    default: () => {
      return getCurrentTime;
    },
  })
  updatedAt: string;
}

export const ArticleSchema = SchemaFactory.createForClass(Article);
