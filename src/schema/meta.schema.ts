import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { AboutDto,LinkItem,MenuItem,RewardItem,SiteInfo,SocialItem } from 'src/types/meta.dto';

export type MetaDocument = Meta & Document;

@Schema()
export class Meta extends Document {
  @Prop({ default: [] })
  links: LinkItem[];

  @Prop({ default: [] })
  socials: SocialItem[];

  @Prop({ default: [] })
  menus: MenuItem[];

  @Prop({ default: [] })
  rewards: RewardItem[];

  @Prop({
    default: { updatedAt: new Date(), content: '' },
  })
  about: AboutDto;

  @Prop()
  siteInfo: SiteInfo;

  @Prop({ default: 0 })
  viewer: number;

  @Prop({ default: 0 })
  visited: number;

  @Prop({ default: [] })
  categories: string[];

  @Prop({ default: 0 })
  totalWordCount: number;
}

export const MetaSchema = SchemaFactory.createForClass(Meta);
