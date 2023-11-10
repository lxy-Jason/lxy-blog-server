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
  star: boolean;

  @Prop({ default: '', index: true, unique: true })
  path: string;

  @Prop({
    index: true,
    default: getCurrentTime(),
  })
  createdAt: string;

  @Prop({
    index: true,
    default: getCurrentTime(),
  })
  updatedAt: string;

  @Prop({ default: 0, index: true })
  top: number;

  @Prop({ default: 0, index: true })
  contentLength: number;

  @Prop({ default: 0 })
  viewer: number; // 浏览人数

  @Prop({ default: 0 })
  visited: number; // 访问量

  @Prop({
    index: true,
    default: getCurrentTime(),
  })
  lastVisitedTime: string;
}

export const ArticleSchema = SchemaFactory.createForClass(Article);
