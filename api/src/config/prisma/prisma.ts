import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { genSalt, hash } from 'bcrypt';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();

    /**
     * This function uses a middleware to hash the password of a User model with a new salt before
     * saving it to the database. It does this by checking if the password field has been modified
     * and, if it has, hashing it with the "hash" function and assigning the hashed password back
     * to the password field.
     */
    this.$use(async (params, next) => {
      const { model, action, args } = params;

      if (model === 'User' && action === 'create') {
        if (!args.data.password) {
          return next(params);
        }

        args.data.password = await hash(args.data.password, await genSalt());
      }

      return next(params);
    });
  }

  async enableShutdownHooks(app: INestApplication) {
    this.$on('beforeExit', async () => {
      await app.close();
    });
  }
}
