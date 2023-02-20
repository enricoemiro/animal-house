import { Injectable } from '@nestjs/common';
import { Product, User } from '@prisma/client';

import { PrismaService } from '@/config/prisma/prisma.service';

@Injectable()
export class OrderService {
  constructor(private prismaService: PrismaService) {}

  async createOne(
    data: { productID: Product['id']; remainingQuantity: number }[],
    userId: User['id'],
    productsIDs: Product['id'][],
  ) {
    try {
      return await this.prismaService.client.$transaction(async (service) => {
        const order = await service.order.create({
          data: {
            products: { connect: productsIDs.map((id) => ({ id })) },
            user: { connect: { id: userId } },
          },
        });

        for (const orderElement of data) {
          await service.product.update({
            where: {
              id: orderElement.productID,
            },
            data: {
              availability: orderElement.remainingQuantity,
            },
          });
        }

        return order;
      });
    } catch (error) {
      throw error;
    }
  }
}
