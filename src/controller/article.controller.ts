import { ApiParam, ApiTags } from '@nestjs/swagger';
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ArticleProvider } from '../provider/article/article.provider';
import { ArticleListParams } from '../types/article';

@ApiTags('article')
@Controller('/article/')
export class ArticleController {
  constructor(private readonly articleProvider: ArticleProvider) {}

  @Get('setArticleByPath')
  async setCategoryByFileName() {
    return await this.articleProvider.setArticleByPath();
  }

  @Get('updateAllArticle')
  async updateAllArticle() {
    return await this.articleProvider.updateAllArticle();
  }

  @Get('getArticleByPath/:path')
  @ApiParam({
    name: 'path',
    description: '文章路径',
    required: true,
  })
  async getArticleByPath(@Param('path') path: string) {
    const res = await this.articleProvider.getArticleByPath(path);
    if (res) {
      return {
        code: 200,
        data: res,
        msg: '文章获取成功',
      };
    } else {
      return {
        code: 500,
        data: null,
        msg: '文章获取失败',
      };
    }
  }

  @Get('getArticleById/:id')
  @ApiParam({
    name: 'id',
    description: '文章id',
    required: true,
  })
  async getArticleById(@Param('id') id: string) {
    const res = await this.articleProvider.getArticleById(id);
    console.log(res);
    if (res) {
      return {
        code: 200,
        data: res,
        msg: '文章获取成功',
      };
    } else {
      return {
        code: 500,
        data: null,
        msg: '文章获取失败',
      };
    }
  }

  @Post('getArticleList')
  @ApiParam({
    name: 'page',
    description: '页数',
    required: true,
  })
  @ApiParam({
    name: 'pageSize',
    description: '一页多少条',
    required: true,
  })
  async getArticleList(@Body() params: ArticleListParams) {
    const res = await this.articleProvider.getArticleList(params);
    const total = await this.articleProvider.getAllStarArticleNum();
    if (res) {
      return {
        code: 200,
        data: {
          list: res,
          total: total,
        },
        msg: '文章列表获取成功',
      };
    } else {
      return {
        code: 500,
        data: null,
        msg: '文章列表获取失败',
      };
    }
  }

  @Get('getAllStarArticleNum')
  async getAllStarArticleNum() {
    const res = await this.articleProvider.getAllStarArticleNum();
    if (res) {
      return {
        code: 200,
        data: res,
        msg: '精选文章总数获取成功',
      };
    } else {
      return {
        code: 500,
        data: null,
        msg: '精选文章总数获取失败',
      };
    }
  }

  @Get('getArticleCountByCategoryName/:name')
  @ApiParam({
    name: 'name',
    description: '分类名',
    required: true,
  })
  async getArticleCountByCategoryName(@Param('name') name: string) {
    const res = await this.articleProvider.getArticleCountByCategoryName(name);
    if (res) {
      return {
        code: 200,
        data: res,
        msg: '文章列表获取成功',
      };
    } else {
      return {
        code: 500,
        data: null,
        msg: '文章列表获取失败',
      };
    }
  }

  @Get('getTimelineInfo')
  async getTimelineInfo() {
    const res = await this.articleProvider.getTimelineInfo();
    if (res) {
      console.log(res);
      const monthArr = Array.from(
        new Set(res.map((item) => item.updatedAt.slice(0, 7))),
      );
      console.log(monthArr);
      //数据处理
      const arr = res.map((item) => ({
        title: item.title,
        id: item._id,
        date: item.updatedAt,
        month: item.updatedAt.slice(0, 7),
      }));
      const list = {};
      for (const month of monthArr) {
        list[month] = arr.filter((item) => item.month === month);
      }
      return {
        data: list,
        code: 200,
        msg: '列表获取成功',
      };
    } else {
      return {
        code: 500,
        data: null,
        msg: '文章列表获取失败',
      };
    }
  }
}
