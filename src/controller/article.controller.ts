import { ApiParam, ApiTags } from '@nestjs/swagger';
import { Controller, Get, Param } from '@nestjs/common';
import { ArticleProvider } from '../provider/article/article.provider';

@ApiTags('article')
@Controller('/api/article/')
export class ArticleController {
  constructor(private readonly articleProvider: ArticleProvider) {}

  @Get('setArticleByPath')
  async setCategoryByFileName() {
    return await this.articleProvider.setArticleByPath();
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
}
