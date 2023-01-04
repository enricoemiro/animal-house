import { Injectable } from '@nestjs/common';
import { Category, Product } from '@prisma/client';

import { PrismaService } from '@/config/prisma/prisma';
import { isDuplicateKeyError } from '@/helpers/helpers';
import { MustHaveFields } from '@/helpers/types/must-have-fields.type';

@Injectable()
export class ProductService {
  constructor(private prismaService: PrismaService) {}

  async createOne(
    product: MustHaveFields<
      Product,
      'name' | 'description' | 'availability' | 'price' | 'categoryId'
    >,
  ) {
    try {
      return await this.prismaService.category.create({ data: product });
    } catch (error) {
      if (isDuplicateKeyError(error, 'products_name_key')) {
      }

      throw error;
    }
  }

  async getProductsByCategory(categoryId: Category['id']) {
    console.log(categoryId);
  }
}
