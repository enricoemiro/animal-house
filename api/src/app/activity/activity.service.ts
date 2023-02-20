import { Injectable } from '@nestjs/common';
import { Activity, Prisma, User } from '@prisma/client';

import { PrismaService } from '@/config/prisma/prisma.service';

import { ActivityAlreadyBookedException } from './exceptions/activity-already-booked.exception';
import { ActivityNotFoundException } from './exceptions/activity-not-found.exception';
import { NoSeatsAvailableException } from './exceptions/no-seats-available.exception';

@Injectable()
export class ActivityService {
  constructor(private readonly prismaService: PrismaService) {}

  async createOne({ headOfficeId, ...others }: Prisma.ActivityUncheckedCreateInput) {
    try {
      return await this.prismaService.client.activity.create({
        data: {
          ...others,
          headOffice: {
            connect: {
              id: headOfficeId,
            },
          },
        },
      });
    } catch (error) {
      throw error;
    }
  }

  async bookOne(activityId: Activity['id'], userId: User['id']) {
    try {
      return await this.prismaService.client.$transaction(async (tx) => {
        const activity = await tx.activity.findUnique({
          where: {
            id: activityId,
          },
        });

        if (!activity) {
          throw new ActivityNotFoundException();
        }

        if (activity.availability <= 0) {
          throw new NoSeatsAvailableException();
        }

        if (activity.userIDs.includes(userId)) {
          throw new ActivityAlreadyBookedException();
        }

        const updatedActivity = await tx.activity.update({
          where: {
            id: activity.id,
          },
          data: {
            availability: {
              decrement: 1,
            },
            users: {
              connect: {
                id: userId,
              },
            },
          },
        });

        return updatedActivity;
      });
    } catch (error) {
      throw error;
    }
  }

  async unbookOne(activityId: Activity['id'], userId: User['id']) {
    try {
      await this.prismaService.client.activity.update({
        where: {
          id: activityId,
        },
        data: {
          availability: {
            increment: 1,
          },
          users: {
            disconnect: {
              id: userId,
            },
          },
        },
      });
    } catch (error) {
      throw error;
    }
  }

  async getBookableActivities(userId: User['id']) {
    try {
      const activities = await this.prismaService.client.activity.findMany({
        where: {
          dateOfPerformance: {
            gte: new Date(),
          },
          availability: {
            gt: 0,
          },
          users: {
            none: {
              id: userId,
            },
          },
        },
        include: {
          headOffice: {
            select: {
              id: true,
              location: true,
            },
          },
        },
        orderBy: {
          createdAt: 'desc',
        },
      });

      return activities;
    } catch (error) {
      throw error;
    }
  }

  async getPreview() {
    try {
      return await this.prismaService.client.activity.findMany({ take: 4 });
    } catch (error) {
      throw error;
    }
  }
}
