import { Injectable } from '@nestjs/common';
import { Category, Prisma } from '@prisma/client';

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

  async deleteCategory(name: Category['name']) {
    try {
      return this.prismaService.client.category.delete({
        where: { name },
      });
    } catch (error) {
      throw error;
    }
  }

  async getCategories() {
    try {
      return await this.prismaService.client.category.findMany();
    } catch (error) {
      throw error;
    }
  }

  async editCategory(id: Category['name'], data: Partial<Pick<Category, 'name'>>) {
    try {
      if (Object.keys(data).length === 0) {
        return null;
      }

      return await this.prismaService.client.category.update({
        where: { id },
        data,
      });
    } catch (error) {
      throw error;
    }
  }
}
