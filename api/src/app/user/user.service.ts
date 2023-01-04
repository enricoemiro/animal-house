import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';

import { HasherService } from '@/app/hasher/hasher.service';
import { isDuplicateKeyError } from '@/common/helpers';
import { PrismaService } from '@/config/prisma/prisma.service';

import { EmailAlreadyInUseException } from './exceptions/email-already-in-use.exception';
import { UserNotFoundException } from './exceptions/user-not-found.exception';

@Injectable()
export class UserService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly hasherService: HasherService,
  ) {}

  async createOne({ password, ...rest }: Prisma.UserCreateInput) {
    try {
      return await this.prismaService.client.user.create({
        data: {
          password: await this.hasherService.hash(password),
          ...rest,
        },
      });
    } catch (error) {
      if (isDuplicateKeyError(error, 'users_email_key')) {
        throw new EmailAlreadyInUseException();
      }

      throw error;
    }
  }

  async findOneByEmail(email: User['email']) {
    const user = await this.prismaService.client.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new UserNotFoundException();
    }

    return user;
  }

  async updateProfile(id: User['id'], data: Prisma.UserUpdateInput) {
    try {
      if (Object.keys(data).length === 0) {
        return null;
      }

      return await this.prismaService.client.user.update({
        where: { id },
        data,
      });
    } catch (error) {
      throw error;
    }
  }
}
