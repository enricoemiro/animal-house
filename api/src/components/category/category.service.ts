import { Injectable } from '@nestjs/common';
import { Category } from '@prisma/client';

import { PrismaService } from '@/config/prisma/prisma';
import { isDuplicateKeyError } from '@/helpers/helpers';
import { MustHaveFields } from '@/helpers/types/must-have-fields.type';

import { DuplicateCategoryNameException } from './exceptions/duplicate-category-name.exception';

@Injectable()
export class CategoryService {
  constructor(private prismaService: PrismaService) {}

  async createOne(category: MustHaveFields<Category, 'name'>) {
    try {
      return await this.prismaService.category.create({ data: category });
    } catch (error) {
      if (isDuplicateKeyError(error, 'categories_name_key')) {
        throw new DuplicateCategoryNameException();
      }

      throw error;
    }
  }

  async getAllCategories() {
    try {
      return await this.prismaService.category.findMany({
        select: {
          id: true,
          name: true,
          _count: true,
        },
        orderBy: {
          products: {
            _count: 'desc',
          },
        },
      });
    } catch (error) {
      throw error;
    }
  }
}
