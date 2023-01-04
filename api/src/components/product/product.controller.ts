import { Controller, Get, Post } from '@nestjs/common';

@Controller('product')
export class ProductController {
  @Post('create')
  async create() {}

  @Get('get/products/by/category')
  async getProductsByCategory() {}
}
