import { Injectable } from '@nestjs/common';
import { Activity, HeadOffice, User } from '@prisma/client';

import { PrismaService } from '@/config/prisma/prisma';
import { isDuplicateKeyError } from '@/helpers/helpers';
import { MustHaveFields } from '@/helpers/types/must-have-fields.type';

import { DuplicateHeadOfficeLocationException } from './exceptions/duplicate-headoffice-location.exception';

@Injectable()
export class HeadOfficeService {
  constructor(private prismaService: PrismaService) {}

  async createOne(
    headOffice: MustHaveFields<HeadOffice, 'location' | 'streetAddress' | 'coordinates'>,
  ) {
    try {
      return await this.prismaService.headOffice.create({ data: headOffice });
    } catch (error) {
      if (isDuplicateKeyError(error, 'headoffices_location_key')) {
        throw new DuplicateHeadOfficeLocationException();
      }

      throw error;
    }
  }

  async getAllLocations() {
    try {
      return await this.prismaService.headOffice.findMany({
        select: {
          id: true,
          location: true,
          streetAddress: true,
          coordinates: true,
          activities: false,
          _count: true,
        },
        orderBy: {
          activities: {
            _count: 'desc',
          },
        },
      });
    } catch (error) {
      throw error;
    }
  }

  async getActivitiesByHeadOfficeId(headOfficeId: HeadOffice['id'], userId: User['id']) {
    try {
      const { activities } = await this.prismaService.headOffice.findFirst({
        where: { id: headOfficeId },
        orderBy: { createdAt: 'desc' },
        select: { activities: true },
      });

      return { activities: activities.filter((activity) => !activity.userIDs.includes(userId)) };
    } catch (error) {
      throw error;
    }
  }

  async updateActivities(headOfficeID: HeadOffice['id'], activityIDs: Activity['id'][]) {
    try {
      const updatedHeadOffice = await this.prismaService.headOffice.update({
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
      return this.prismaService.headOffice.delete({
        where: { id },
      });
    } catch (error) {
      throw error;
    }
  }

  async deleteHeadOffices(headOfficeIDs: HeadOffice['id'][]) {
    try {
      return this.prismaService.headOffice.deleteMany({
        where: {
          id: {
            in: headOfficeIDs,
          }
        },
      });
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

      return await this.prismaService.headOffice.update({
        where: { id },
        data,
      });
    } catch (error) {
      throw error;
    }
  }
}
