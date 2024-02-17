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
  async handlerArticle(paths: string[]) {
    const updated = [];
    const created = [];
    for (const path of paths) {
      const isExist = await this.articleModel.findOne({ path: path });
      if (isExist) {
        const data = getArticleData(path);
        if (data.content !== isExist.content) {
          console.log('文章更新:', path);
          updated.push(path);
          await this.updateArticle(data, path);
        }
      } else {
        const data = getArticleData(path);
        console.log('新增文章:', path);
        created.push(path);
        await this.articleModel.create(data);
      }
    }
    return {
      updated,
      created,
    };
  }

  // 通过git pull 更新文章
  async setArticleByPath() {
    const paths = await getArticlePath(); //获取文章路径
    console.log('更新文章列表:', paths);
    if (!paths.length) {
      return {
        msg: '无更新',
      };
    }
    const res = await this.handlerArticle(paths);
    return {
      msg: '更新完成',
      data: res,
    };
  }

  // 更新文章
  async updateArticle(data, path) {
    data.updatedAt = getCurrentTime();
    return this.articleModel.updateOne({ path: path }, data);
  }
  async updateArticleById(params) {
    const {id,content} = params
    const data = await this.articleModel.findOne({_id:id}).exec()
    if(data){
      data.updatedAt = getCurrentTime();
      data.content = content
      return this.articleModel.updateOne({ _id: id }, data);
    }
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

  // 获取精选文章列表
  async getArticleList(params) {
    const { page = 1, pageSize = 10 } = params;
    const res = await this.articleModel
      .find({ star: true })
      .sort({ _id: -1 })
      .skip((page - 1) * pageSize)
      .limit(pageSize)
      .exec();
    return res;
  }

  // 获取精选文章数量总数
  async getAllStarArticleNum() {
    const res = await this.articleModel
      .find({ star: true })
      .countDocuments()
      .exec();
    return res;
  }

  // 读取所有文章路径,更新文章
  async updateAllArticle() {
    const paths = getAllArticlePath(); //获取文章路径
    const res = await this.handlerArticle(paths);
    return {
      msg: '全部文章更新完成',
      data: res,
    };
  }

  //根据分类获取文章数量
  async getArticleCountByCategory(category) {
    const res = this.articleModel.find({ category }).countDocuments().exec();
    return res;
  }

  //根据分类名获取对应的文章列表,时间倒序排列
  async getArticleCountByCategoryName(name) {
    const res = this.articleModel
      .find({ category: name })
      .sort({ updatedAt: -1 })
      .select('title updatedAt _id');
    return res;
  }

  //根据创建时间返回文章列表timeline
  async getTimelineInfo() {
    const res = this.articleModel
      .find({ star: true })
      .sort({ updatedAt: -1 })
      .select('title updatedAt _id');
    return res;
  }

  // 全局搜索功能,关键字匹配
  async searchArticle(params:string) {
    const key = new RegExp(params,'gi')
    const articles = await this.articleModel
      .find({
        $or: [
          { "title": { $regex: key } },
          { "content": { $regex: key } }
        ]
      })
      .select('title content _id category')
    const matchedSentences = articles.map(article => {
      const {title, content,_id,category} = article
      const matchedContentSentences = content.split('\n').filter(sentence => key.test(sentence));
      const children = matchedContentSentences.map((item,index) => {
        return {
          title:item,
          key: index + _id, //通过_id找到对应的文章_id,index结合_id用于唯一标识
          isLeaf: true
        }
      })
      return {
        title,
        key:_id,
        category,
        children
      }
    })
    return matchedSentences
  }
}
