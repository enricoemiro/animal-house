import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import pagination from 'prisma-extension-pagination';

@Injectable()
export class PrismaService implements OnModuleInit {
  public client: Omit<PrismaClient, '$use'>;

  constructor() {
    this.client = new PrismaClient().$extends(pagination);
  }

  async onModuleInit() {
    await this.client.$connect();
  }

  async enableShutdownHooks(app: INestApplication) {
    this.client.$on('beforeExit', async () => {
      await app.close();
    });
  }
}
