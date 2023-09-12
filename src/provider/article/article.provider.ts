import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ArticleDucoment } from '../../schema/article.schema';
import { Model } from 'mongoose';
import {
  getArticleData,
  getArticlePath,
  getAllArticlePath,
} from '../../utils/addArticleByNote';
import getCurrentTime from '../../utils/getCurrentTime';

@Injectable()
export class ArticleProvider {
  constructor(
    @InjectModel('Article') private articleModel: Model<ArticleDucoment>,
  ) {}

  async handlerArticle(paths) {
    for (const path of paths) {
      const isExist = await this.articleModel.findOne({ path: path });
      if (isExist) {
        await this.updateArticle(path);
      } else {
        const data = getArticleData(path);
        const res = await this.articleModel.create(data);
      }
    }
  }

  async setArticleByPath() {
    const paths = await getArticlePath(); //获取文章路径
    console.log(paths);
    await this.handlerArticle(paths);
  }

  async updateArticle(path) {
    const data = getArticleData(path);
    data.updatedAt = getCurrentTime();
    const res = await this.articleModel.updateOne({ path: path }, data);
  }

  async getArticleByPath(path: string) {
    const res = await this.articleModel.findOne({ path: path }).exec();
    return res;
  }

  async getArticleById(id: string) {
    console.log(id);
    const res = await this.articleModel.findOne({ _id: id }).exec();
    return res;
  }

  async getArticleList(params) {
    const { page = 1, pageSize = 10 } = params;
    const res = await this.articleModel
      .find()
      .skip((page - 1) * pageSize)
      .limit(pageSize)
      .exec();
    return res;
  }

  async getAllArticleNum() {
    const res = await this.articleModel.countDocuments().exec();
    return res;
  }

  async updateAllArticle() {
    const paths = getAllArticlePath(); //获取文章路径
    await this.handlerArticle(paths);
  }
}
