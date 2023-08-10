import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { UserType } from '../types/user';

export type UserDocument = User & Document;

@Schema()
export class User extends Document {
  @Prop({ index: true, unique: true })
  id: number;

  @Prop({ index: true })
  name: string;

  @Prop()
  password: string;

  @Prop()
  type: UserType;

  @Prop({
    default: () => {
      return new Date();
    },
  })
  createdAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
