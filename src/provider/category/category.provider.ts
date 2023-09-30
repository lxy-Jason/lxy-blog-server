import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CategoryDocument } from '../../schema/category.schema';
import { Model } from 'mongoose';
import { ArticleDucoment } from '../../schema/article.schema';

@Injectable()
export class CategoryProvider {
  constructor(
    @InjectModel('Category') private categoryModal: Model<CategoryDocument>,
    @InjectModel('Article') private articleModel: Model<ArticleDucoment>,
  ) {}

  async updateCategory(name) {
    const isExist = await this.categoryModal.findOne({ name: name });
    const count = await this.articleModel
      .countDocuments({ category: name })
      .exec();
    if (isExist) {
      await this.categoryModal.updateOne(
        { name: name },
        { articleCount: count },
      );
    } else {
      await this.categoryModal.create({ name: name, articleCount: count });
    }
  }

  async getCategoryCount(name) {
    const res = this.categoryModal.findOne({ name: name });
    return res;
  }

  // 获取分类列表
  async getCategoryList() {
    const categoryList = await this.categoryModal.find().exec();
    const res = categoryList.map(async (category) => {
      const articleList: { title: string; updatedAt: string }[] =
        await this.articleModel
          .find({ category: category.name })
          .select('title updatedAt');
      return {
        name: category.name,
        articleList,
      };
    });
    console.log(res);
    return res;
  }
}
