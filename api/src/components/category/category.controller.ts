import { Body, Controller, Get, Post } from '@nestjs/common';

import { CategoryService } from './category.service';
import { CreateDTO } from './dtos/create.dto';

@Controller('category')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @Post('create')
  async create(@Body() createDTO: CreateDTO) {
    await this.categoryService.createOne(createDTO);
    return { message: 'The category has been successfully created.' };
  }

  @Get('/get/all/categories')
  async getAllCategories() {
    const categories = await this.categoryService.getAllCategories();
    return { categories };
  }
}
