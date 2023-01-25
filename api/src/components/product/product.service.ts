import { Injectable } from '@nestjs/common';
import { Category, Product } from '@prisma/client';

import { PrismaService } from '@/config/prisma/prisma';
import { isDuplicateKeyError } from '@/helpers/helpers';
import { MustHaveFields } from '@/helpers/types/must-have-fields.type';

@Injectable()
export class ProductService {
  constructor(private prismaService: PrismaService) { }

  async createOne(
    product: MustHaveFields<
      Product,
      'name' | 'description' | 'availability' | 'price' | 'categoryId'
    >,
  ) {
    try {
      return await this.prismaService.product.create({ data: product });
    } catch (error) {
      if (isDuplicateKeyError(error, 'products_name_key')) {
      }

      throw error;
    }
  }

  async getProductsByCategory(categoryId: Category['id']) {
    try {
      return await this.prismaService.product.findMany({
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
        },
      });
    } catch (error) {
      throw error;
    }
  }
  // se vogliamo mettere più immagini bisogna
  // appendere un index dato dalla lunghezza dell'array
  async updatePicture(productId: Product['id']) {
    try {
      return await this.prismaService.product.update({
        where: { id: productId },
        data: {
          images: {
            push: 'http://localhost:3000/public/products/' + productId + '.webp',
          },
        },
      });
    } catch (error) {
      throw error;
    }
  }

  async getProducts() {
    try {
      return await this.prismaService.product.findMany({
        select: {
          id: true,
          name: true,
          description: true,
          availability: true,
          price: true,
          images: true,
          category: true,
        }
      })
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

      return await this.prismaService.product.update({
        where: { id },
        data,
      });
    } catch (error) {
      throw error;
    }
  }

  async deleteProduct(id: Product['id']) {
    try {
      return this.prismaService.product.delete({
        where: { id },
      });
    } catch (error) {
      throw error;
    }
  }

  async deleteProducts(productIDs: Product['id'][]) {
    try {
      return this.prismaService.product.deleteMany({
        where: {
          id: {
            in: productIDs,
          }
        },
      });
    } catch (error) {
      throw error;
    }
  }
}
