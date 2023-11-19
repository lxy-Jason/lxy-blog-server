/*
 * @Author: xiangyue_li
 * @Date: 2023-08-08 22:12:58
 * @LastEditors: xiangyue_li
 */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ScheduleModule } from '@nestjs/schedule';
// 引入 Mongoose
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from './controller/user.controller';
import { UserProvider } from './provider/user/user.provider';
import { User, UserSchema } from './schema/user.schema';
import { ArticleProvider } from './provider/article/article.provider';
import { CategoryProvider } from './provider/category/category.provider';
import { Article, ArticleSchema } from './schema/article.schema';
import { Category, CategorySchema } from './schema/category.schema';
import { CategoryController } from './controller/category.controller';
import { ArticleController } from './controller/article.controller';
import { TasksProvider } from './provider/tasks/tasks.provider';

const url = process.env.MONGO_URL || '127.0.0.1';

@Module({
  imports: [
    MongooseModule.forRoot(`mongodb://${url}`, {
      dbName: 'blog',
    }),
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema }, // 这里User.name实际上就是Class User 这个User
      { name: Article.name, schema: ArticleSchema },
      { name: Category.name, schema: CategorySchema },
    ]),
    ScheduleModule.forRoot(),
  ],
  controllers: [
    AppController,
    UserController,
    CategoryController,
    ArticleController,
  ],
  providers: [
    AppService,
    UserProvider,
    CategoryProvider,
    ArticleProvider,
    TasksProvider,
  ],
  exports: [ArticleProvider],
})
export class AppModule {}
