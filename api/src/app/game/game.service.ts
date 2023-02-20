import { Injectable } from '@nestjs/common';
import { Game, User } from '@prisma/client';

import { PrismaService } from '@/config/prisma/prisma.service';

@Injectable()
export class GameService {
  constructor(private prismaService: PrismaService) {}

  async upsert(userId: User['id'], data: { score: Game['score']; name: Game['name'] }) {
    try {
      return await this.prismaService.client.$transaction(async (service) => {
        const game = await service.game.findFirst({
          where: { AND: [{ userId: { equals: userId } }, { name: { equals: data.name } }] },
        });

        if (game) {
          if (game?.score < data.score) {
            return await service.game.update({
              where: { userId_name: { name: 'QUIZ', userId: userId } },
              data: {
                score: data.score,
              },
            });
          }
          return game;
        }

        return await service.game.create({
          data: { score: data.score, name: data.name, user: { connect: { id: userId } } },
        });
      });
    } catch (error) {
      throw error;
    }
  }

  async getAllGames() {
    try {
      return await this.prismaService.client.game.findMany({
        select: { id: true, name: true, score: true, user: { select: { name: true } } },
      });
    } catch (error) {
      throw error;
    }
  }
}
