import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ArticleDucoment } from '../../schema/article.schema';
import { Model } from 'mongoose';
import { getArticleData, getArticlePath } from '../../utils/addArticleByNote';
import getCurrentTime from '../../utils/getCurrentTime';

@Injectable()
export class ArticleProvider {
  constructor(
    @InjectModel('Article') private articleModel: Model<ArticleDucoment>,
  ) {}

  async setArticleByPath() {
    const paths = await getArticlePath(); //获取文章路径
    console.log(paths);
    for (const path of paths) {
      const isExist = await this.articleModel.findOne({ path: path });
      if (isExist) {
        await this.updateArticle(path);
      } else {
        const data = getArticleData(path);
        const res = await this.articleModel.create(data);
        console.log(res);
      }
    }
  }

  async updateArticle(path) {
    const data = getArticleData(path);
    data.updatedAt = getCurrentTime();
    const res = await this.articleModel.updateOne({ path: path }, data);
    console.log(res);
  }

  async getArticleByPath(path: string) {
    const res = await this.articleModel.findOne({ path: path }).exec();
    return res;
  }
}
