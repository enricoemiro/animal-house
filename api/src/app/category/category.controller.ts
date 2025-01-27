import { Body, Controller, Get, Post } from '@nestjs/common';

import { RequiresAuth } from '../auth/decorators/requires-auth.decorator';
import { SkipAuth } from '../auth/decorators/skip-auth.decorator';
import { CategoryService } from './category.service';
import { CreateDTO } from './dtos/create.dto';

@Controller('/api/v1/category')
@RequiresAuth(true)
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @Post('create')
  async create(@Body() createDTO: CreateDTO) {
    await this.categoryService.createOne(createDTO);
    return { message: 'The category has been successfully created.' };
  }

  @Get('/get/all/categories')
  @SkipAuth()
  async getAllCategories() {
    const categories = await this.categoryService.getAllCategories();
    return { categories };
  }
}
