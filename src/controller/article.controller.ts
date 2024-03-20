import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ArticleProvider } from '../provider/article/article.provider';
import { ArticleListParams } from '../types/article';
import { get } from 'mongoose';

@ApiTags('文章接口')
@Controller('/article/')
export class ArticleController {
  constructor(private readonly articleProvider: ArticleProvider) {}

  @ApiOperation({
    summary: '更新文章',
    description: 'git pull 更新文章',
  })
  @Get('setArticleByPath')
  async setCategoryByFileName() {
    return await this.articleProvider.setArticleByPath();
  }
  @ApiOperation({
    summary: '更新所有文章',
    description: '读取本地文件更新所有文章',
  })
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
  @ApiOperation({
    summary: '更新文章',
    description: '通过id更新文章',
  })
  @Post('updateArticleById')
  @ApiParam({
    name: 'id',
    description: '文章id',
    required: true,
  })
  @ApiParam({
    name: 'content',
    description: '文章内容',
    required: true,
  })
  async updateArticleById(@Body() params) {
    const res = await this.articleProvider.updateArticleById(params)
    if(res){
      return {
        code: 200,
        data: res,
        msg: '文章更新成功'
      }
    }
    else {
      return {
        code: 500,
        data: res,
        msg: '文章更新失败'
      }
    }
  }

  @ApiOperation({
    summary: '关键词搜索文章',
    description: '关键词搜索文章',
  })
  @Get('searchArticle/:key')
  @ApiParam({
    name: 'key',
    description: '关键词',
    required: true,
  })
  async searchArticle(@Param('key') key: string) {
    const res = await this.articleProvider.searchArticle(key)
    if (res) {
      return {
        code: 200,
        data: res,
        msg: '关键词搜索成功',
      };
    } else {
      return {
        code: 500,
        data: null,
        msg: '关键词搜索失败',
      };
    }
  }
}
