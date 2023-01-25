import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { omit } from 'lodash';

import { PrismaService } from '@/config/prisma/prisma';
import { isDuplicateKeyError } from '@/helpers/helpers';

import { EmailAlreadyInUseException } from './exceptions/email-already-in-use.exception';
import { UserNotFoundException } from './exceptions/user-not-found.exception';
// import { DeleteBucketWebsiteRequestFilterSensitiveLog } from '@aws-sdk/client-s3';

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) { }

  async createOne(user: any) {
    try {
      return await this.prismaService.user.create({ data: user });
    } catch (error) {
      if (isDuplicateKeyError(error, 'users_email_key')) {
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

  async bookedActivities(userId: User['id']) {
    try {
      const { activities } = await this.prismaService.user.findFirst({
        where: { id: userId },
        select: {
          activities: {
            include: {
              headOffice: true,
              users: false,
            },
          },
        },
      });

      return activities.map((activity) => omit(activity, ['usersIDs', 'createdAt', 'updatedAt']));
    } catch (error) {
      throw error;
    }
  }

  async updateProfile(
    id: User['id'],
    data: Partial<Pick<User, 'email' | 'name' | 'dateOfBirth' | 'gender'>>,
  ) {
    try {
      if (Object.keys(data).length === 0) {
        return null;
      }

      return await this.prismaService.user.update({
        where: { id },
        data,
      });
    } catch (error) {
      throw error;
    }
  }

  async getUsers() {
    try { return await this.prismaService.user.findMany() } catch (error) {
      throw error;
    }
  }

  async deleteUser(id: User['id']) {
    try {
      return this.prismaService.user.delete({
        where: { id },
      });
    } catch (error) {
      throw error;
    }
  }

  async deleteUsers(userIDs: User['id'][]) {
    try {
      return this.prismaService.user.deleteMany({
        where: {
          id: {
            in: userIDs,
          }
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

      return await this.prismaService.user.update({
        where: { id },
        data,
      });
    } catch (error) {
      throw error;
    }
  }
}
