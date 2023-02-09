import { Injectable } from '@nestjs/common';
import { Activity, HeadOffice, Prisma, User } from '@prisma/client';

import { isDuplicateKeyError } from '@/common/helpers';
import { PrismaService } from '@/config/prisma/prisma.service';

import { DuplicateHeadOfficeLocationException } from './exceptions/duplicate-headoffice-location.exception';

@Injectable()
export class HeadOfficeService {
  constructor(private prismaService: PrismaService) {}

  async createOne(headOffice: Prisma.HeadOfficeCreateInput) {
    try {
      return await this.prismaService.client.headOffice.create({
        data: headOffice,
      });
    } catch (error) {
      if (isDuplicateKeyError(error, 'headoffices_location_key')) {
        throw new DuplicateHeadOfficeLocationException();
      }

      throw error;
    }
  }

  async getAllLocations() {
    try {
      return await this.prismaService.client.headOffice.findMany({});
    } catch (error) {
      throw error;
    }
  }

  async getActivitiesByHeadOfficeId(headOfficeId: HeadOffice['id'], userId: User['id']) {
    try {
      const result = await this.prismaService.client.headOffice.findFirst({
        where: {
          id: headOfficeId,
        },
        select: {
          activities: {
            where: {
              dateOfPerformance: {
                gte: new Date(),
              },
              availability: {
                gt: 0,
              },
              users: {
                every: {
                  NOT: {
                    id: userId,
                  },
                },
              },
            },
          },
        },
        orderBy: {
          createdAt: 'desc',
        },
      });

      return result?.activities;
    } catch (error) {
      throw error;
    }
  }
}
