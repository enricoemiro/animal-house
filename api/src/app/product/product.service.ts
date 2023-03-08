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

  async getProducts() {
    try {
      return await this.prismaService.client.product.findMany({
        select: {
          id: true,
          name: true,
          description: true,
          availability: true,
          price: true,
          images: true,
          category: true,
        },
      });
    } catch (error) {
      throw error;
    }
  }

  async editProduct(
    id: Product['id'],
    data: Partial<Pick<Product, 'name' | 'description' | 'availability' | 'price' | 'categoryId'>>,
  ) {
    try {
      if (Object.keys(data).length === 0) {
        return null;
      }

      return await this.prismaService.client.product.update({
        where: { id },
        data,
      });
    } catch (error) {
      throw error;
    }
  }

  async deleteProduct(id: Product['id']) {
    try {
      return this.prismaService.client.product.delete({
        where: { id },
      });
    } catch (error) {
      throw error;
    }
  }

  async deleteProducts(productIDs: Product['id'][]) {
    try {
      return this.prismaService.client.product.deleteMany({
        where: {
          id: {
            in: productIDs,
          },
        },
      });
    } catch (error) {
      throw error;
    }
  }
}
