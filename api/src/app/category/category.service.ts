import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { isDuplicateKeyError } from '@/common/helpers';
import { PrismaService } from '@/config/prisma/prisma.service';

import { DuplicateCategoryNameException } from './exceptions/duplicate-category-name.exception';

@Injectable()
export class CategoryService {
  constructor(private prismaService: PrismaService) {}

  async createOne(category: Prisma.CategoryUncheckedCreateInput) {
    try {
      return await this.prismaService.client.category.create({ data: category });
    } catch (error) {
      if (isDuplicateKeyError(error, 'categories_name_key')) {
        throw new DuplicateCategoryNameException();
      }

      throw error;
    }
  }

  async getAllCategories() {
    try {
      return await this.prismaService.client.category.findMany({
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
