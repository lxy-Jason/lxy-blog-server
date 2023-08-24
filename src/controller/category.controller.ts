import { ApiTags } from '@nestjs/swagger';
import { CategoryProvider } from '../provider/category/category.provider';
import { Controller, Get } from '@nestjs/common';

@ApiTags('category')
@Controller('/category/')
export class CategoryController {
  constructor(private readonly categoryProvider: CategoryProvider) {}
}
