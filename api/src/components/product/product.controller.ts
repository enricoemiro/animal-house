import { Body, Controller, Get, Param, Post } from '@nestjs/common';

import { RequiresAuth } from '../auth/decorators/requires-auth.decorator';
import { CreateDTO } from './dtos/create.dto';
import { GetProductsByCategoryDTO } from './dtos/getProductsByCategory.dto';
import { ProductsNotFoundException } from './exceptions/products-not-found-exception.exception';
import { ProductService } from './product.service';

@Controller('product')
@RequiresAuth(true)
export class ProductController {
  constructor(private productService: ProductService) {}

  @Post('create')
  async create(@Body() createDTO: CreateDTO) {
    await this.productService.createOne(createDTO);
    return { message: 'The product has been successfully created.' };
  }

  @Get('get/products/:categoryId')
  async getProductsByCategory(@Param() { categoryId }: GetProductsByCategoryDTO) {
    const products = await this.productService.getProductsByCategory(categoryId);

    if (!products) {
      throw new ProductsNotFoundException();
    }
    return products;
  }
}
