import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CategoryProvider } from '../provider/category/category.provider';
import { Controller, Get } from '@nestjs/common';
import { getArticleCategory } from '../utils/addArticleByNote';

@ApiTags('category')
@Controller('/category/')
export class CategoryController {
  constructor(private readonly categoryProvider: CategoryProvider) {}

  @ApiOperation({
    summary: '更新所有分类',
    description: '更新所有分类',
  })
  @Get('updateAllCategory')
  async updateAllCategory() {
    const categorys = getArticleCategory();
    for (const category of categorys) {
      await this.categoryProvider.updateCategory(category);
    }
  }

  @Get('getCategoryList')
  async getCategoryList() {
    const res = await this.categoryProvider.getCategoryList();
    if (res) {
      return {
        code: 200,
        data: res,
        msg: '分类列表获取成功',
      };
    } else {
      return {
        code: 500,
        data: null,
        msg: '分类列表获取失败',
      };
    }
  }
}
