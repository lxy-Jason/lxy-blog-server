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

  // 文章处理 1.判断是否存在 2.存在则更新 3.不存在则创建
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

  // 通过git pull 更新文章
  async setArticleByPath() {
    const paths = await getArticlePath(); //获取文章路径
    console.log(paths);
    await this.handlerArticle(paths);
  }

  // 更新文章
  async updateArticle(path) {
    const data = getArticleData(path);
    data.updatedAt = getCurrentTime();
    const res = await this.articleModel.updateOne({ path: path }, data);
  }

  // 通过文章路径获取文章
  async getArticleByPath(path: string) {
    const res = await this.articleModel.findOne({ path: path }).exec();
    return res;
  }

  // 通过文章id获取文章
  async getArticleById(id: string) {
    const res = await this.articleModel.findOne({ _id: id }).exec();
    return res;
  }

  // 获取文章列表
  async getArticleList(params) {
    const { page = 1, pageSize = 10 } = params;
    const res = await this.articleModel
      .find()
      .sort({ _id: -1 })
      .skip((page - 1) * pageSize)
      .limit(pageSize)
      .exec();
    return res;
  }

  // 获取文章数量总数
  async getAllArticleNum() {
    const res = await this.articleModel.countDocuments().exec();
    return res;
  }

  // 读取所有文章路径,更新文章
  async updateAllArticle() {
    const paths = getAllArticlePath(); //获取文章路径
    await this.handlerArticle(paths);
  }

  //根据分类获取文章数量
  async getArticleCountByCategory(category) {
    const res = this.articleModel.find({ category }).countDocuments().exec();
    return res;
  }
}
