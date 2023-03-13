import { Injectable } from '@nestjs/common';
import { Activity, HeadOffice, Prisma, User } from '@prisma/client';

import { isDuplicateKeyError } from '@/common/helpers';
import { PrismaService } from '@/config/prisma/prisma.service';

import { DuplicateHeadOfficeLocationException } from './exceptions/duplicate-headoffice-location.exception';
import { NotDeletedHeadOfficeException } from './exceptions/not-deleted-headoffice-exception.exception';

@Injectable()
export class HeadOfficeService {
  constructor(private prismaService: PrismaService) { }

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

  async updateActivities(headOfficeID: HeadOffice['id'], activityIDs: Activity['id'][]) {
    try {
      const updatedHeadOffice = await this.prismaService.client.headOffice.update({
        where: { id: headOfficeID },
        data: { activities: { connect: activityIDs.map((id) => ({ id })) } },
        include: { activities: true },
      });

      return updatedHeadOffice;
    } catch (error) {
      throw error;
    }
  }

  async deleteHeadOffice(id: HeadOffice['id']) {
    try {
      return this.prismaService.client.$transaction(async (service) => {
        await service.activity.deleteMany({ where: { headOfficeId: id } });

        const deletedHeadOffice = await service.headOffice.delete({
          where: { id },
        });
        if (!deletedHeadOffice) {
          throw new NotDeletedHeadOfficeException();
        }
      });
    } catch (error) {
      throw error;
    }
  }

  async deleteHeadOffices(headOfficeIDs: HeadOffice['id'][]) {
    try {
      return this.prismaService.client.$transaction(async (service) => {
        await service.activity.deleteMany({
          where: {
            id: {
              in: headOfficeIDs,
            },
          },
        });

        const deletedHeadOffices = await service.headOffice.deleteMany({
          where: {
            id: {
              in: headOfficeIDs,
            },
          },
        });

        if (!deletedHeadOffices) {
          throw new NotDeletedHeadOfficeException();
        }
      })
    } catch (error) {
      throw error;
    }
  }

  async editHeadOffice(
    id: HeadOffice['id'],
    data: Partial<Pick<HeadOffice, 'location' | 'streetAddress' | 'coordinates'>>,
  ) {
    try {
      if (Object.keys(data).length === 0) {
        return null;
      }

      return await this.prismaService.client.headOffice.update({
        where: { id },
        data,
      });
    } catch (error) {
      throw error;
    }
  }
}
