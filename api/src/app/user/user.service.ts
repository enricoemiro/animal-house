import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';

import { HasherService } from '@/app/hasher/hasher.service';
import { isDuplicateKeyError } from '@/common/helpers';
import { PrismaService } from '@/config/prisma/prisma.service';

import { EmailAlreadyInUseException } from './exceptions/email-already-in-use.exception';
import { NotDeletedUserException } from './exceptions/not-deleted-user.exception';
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

  async bookedActivities(userId: User['id']) {
    try {
      const { activities } = await this.prismaService.client.user.findUnique({
        where: {
          id: userId,
        },
        include: {
          activities: {
            include: {
              users: false,
            },
          },
        },
      });

      return activities;
    } catch (error) {
      throw error;
    }
  }

  async getUserAnimals(userId: User['id']) {
    try {
      const { animals } = await this.prismaService.client.user.findUnique({
        where: {
          id: userId,
        },
        include: {
          animals: {
            include: {
              user: false,
            },
          },
        },
      });

      return animals;
    } catch (error) {
      throw error;
    }
  }

  async updateVip(userId: User['id'], vipValue: User['vip']) {
    try {
      return await this.prismaService.client.user.update({
        where: { id: userId },
        data: {
          vip: vipValue,
        },
      });
    } catch (error) {
      throw error;
    }
  }

  async getUsers() {
    try {
      return await this.prismaService.client.user.findMany();
    } catch (error) {
      throw error;
    }
  }

  async deleteUser(id: User['id']) {
    try {
      return await this.prismaService.client.$transaction(async (service) => {
        await service.game.deleteMany({ where: { userId: id } });
        await service.post.deleteMany({ where: { userId: id } });

        const deletedUser = await service.user.delete({
          where: { id },
        });

        if (!deletedUser) {
          throw new NotDeletedUserException();
        }
      });
    } catch (error) {
      throw error;
    }
  }

  async deleteUsers(userIDs: User['id'][]) {
    try {
      return this.prismaService.client.user.deleteMany({
        where: {
          id: {
            in: userIDs,
          },
        },
      });
    } catch (error) {
      throw error;
    }
  }

  async editUser(
    id: User['id'],
    data: Partial<Pick<User, 'email' | 'name' | 'dateOfBirth' | 'gender' | 'role'>>,
  ) {
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
