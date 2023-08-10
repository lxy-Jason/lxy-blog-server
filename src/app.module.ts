/*
 * @Author: xiangyue_li
 * @Date: 2023-08-08 22:12:58
 * @LastEditors: xiangyue_li
 */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// 引入 Mongoose
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from './controller/user.controller';
import { UserProvider } from './provider/user/user.provider';
import { User, UserSchema } from './schema/user.schema';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://127.0.0.1', {
      dbName: 'blog',
    }),
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema }, // 这里User.name实际上就是Class User 这个User
    ]),
  ],
  controllers: [AppController, UserController],
  providers: [AppService, UserProvider],
})
export class AppModule {}
