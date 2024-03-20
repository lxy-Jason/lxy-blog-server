import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CategoryProvider } from '../provider/category/category.provider';
import { Controller, Get } from '@nestjs/common';
import { getArticleCategory } from '../utils/addArticleByNote';

@ApiTags('分类接口')
@Controller('/category/')
export class CategoryController {
  constructor(private readonly categoryProvider: CategoryProvider) {}

  @ApiOperation({
    summary: '更新所有分类',
    description: '更新所有分类',
  })
  @Get('updateAllCategory')
  async updateAllCategory() {
    console.log('更新所有分类')
    const categorys = getArticleCategory();
    for (const category of categorys) {
      await this.categoryProvider.updateCategory(category);
    }
  }

  @Get('getCategoryList')
  async getCategoryList() {
    console.log('获取分类列表')
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
