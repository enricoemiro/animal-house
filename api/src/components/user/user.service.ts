import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';

import { PrismaService } from '@/config/prisma/prisma';
import { MustHaveFields } from '@/helpers/types/must-have-fields.type';

import { EmailAlreadyInUseException } from './exceptions/email-already-in-use.exception';
import { UserNotFoundException } from './exceptions/user-not-found.exception';

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {}

  async createOne(user: MustHaveFields<Omit<User, 'id'>, 'name' | 'email' | 'password'>) {
    try {
      return await this.prismaService.user.create({ data: user });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002' &&
        error.meta.target === 'users_email_key'
      ) {
        throw new EmailAlreadyInUseException();
      }

      throw error;
    }
  }

  async findOneByEmail(email: User['email']) {
    const user = await this.prismaService.user.findFirst({ where: { email } });

    if (!user) {
      throw new UserNotFoundException();
    }

    return user;
  }
}
