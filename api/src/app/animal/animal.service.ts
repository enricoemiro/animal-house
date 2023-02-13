import { Injectable } from '@nestjs/common';
import { Animal, Prisma } from '@prisma/client';

import { PrismaService } from '@/config/prisma/prisma.service';

@Injectable()
export class AnimalService {
  constructor(private readonly prismaService: PrismaService) {}

  async create({ userId, ...others }: Prisma.AnimalUncheckedCreateInput) {
    try {
      return await this.prismaService.client.animal.create({
        data: {
          ...others,
          user: {
            connect: {
              id: userId,
            },
          },
        },
      });
    } catch (error) {
      throw error;
    }
  }

  async delete(animalId: Animal['id']) {
    try {
      return await this.prismaService.client.animal.delete({
        where: {
          id: animalId,
        },
      });
    } catch (error) {
      throw error;
    }
  }
}
