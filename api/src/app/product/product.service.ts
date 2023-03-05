import { Injectable } from '@nestjs/common';
import { Category, Prisma, Product } from '@prisma/client';

import { isDuplicateKeyError } from '@/common/helpers';
import { PrismaService } from '@/config/prisma/prisma.service';

@Injectable()
export class ProductService {
  constructor(private prismaService: PrismaService) {}

  async createOne(product: Prisma.ProductUncheckedCreateInput) {
    try {
      return await this.prismaService.client.product.create({
        data: {
          name: product.name,
          description: product.description,
          availability: product.availability,
          price: product.price,
          images: product.images,
          category: {
            connect: {
              id: product.categoryId,
            },
          },
        },
      });
    } catch (error) {
      if (isDuplicateKeyError(error, 'products_name_key')) {
      }

      throw error;
    }
  }

  async getProductsByCategory(categoryId: Category['id']) {
    try {
      return await this.prismaService.client.product.findMany({
        where: {
          categoryId: categoryId,
        },
        select: {
          id: true,
          name: true,
          description: true,
          availability: true,
          price: true,
          images: true,
          category: {
            select: {
              name: true,
            },
          },
        },
      });
    } catch (error) {
      throw error;
    }
  }

  async getProductById(id: Product['id']) {
    try {
      return await this.prismaService.client.product.findFirst({
        where: {
          id: id,
        },
        select: {
          id: true,
          name: true,
          description: true,
          images: true,
          price: true,
          availability: true,
        },
      });
    } catch (error) {
      throw error;
    }
  }

  async getPreview() {
    try {
      return await this.prismaService.client.product.findMany({
        take: 8,
        select: {
          images: true,
          name: true,
          availability: true,
          description: true,
          id: true,
          price: true,
        },
      });
    } catch (error) {
      throw error;
    }
  }
}
