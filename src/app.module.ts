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

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://127.0.0.1', {
      dbName: 'blog',
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
