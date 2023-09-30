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
  async getArticleList(@Body() params: ArticleListParams) {
    const res = await this.articleProvider.getArticleList(params);
    const total = await this.articleProvider.getAllArticleNum();
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

  @Get('getAllArticleNum')
  async getAllArticleNum() {
    const res = await this.articleProvider.getAllArticleNum();
    if (res) {
      return {
        code: 200,
        data: res,
        msg: '文章总数获取成功',
      };
    } else {
      return {
        code: 500,
        data: null,
        msg: '文章总数获取失败',
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
}
