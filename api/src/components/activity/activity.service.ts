import { Injectable } from '@nestjs/common';
import { Activity, User } from '@prisma/client';

import { PrismaService } from '@/config/prisma/prisma';
import { MustHaveFields } from '@/helpers/types/must-have-fields.type';

import { ActivityAlreadyBookedException } from './exceptions/activity-already-booked.exception';
import { ActivityNotFoundException } from './exceptions/activity-not-found.exception';
import { AvailableActivitiesNotFoundException } from './exceptions/available-activities-not-found.exceptions';
import { NoSeatsAvailableException } from './exceptions/no-seats-available.exception';

@Injectable()
export class ActivityService {
  constructor(private prismaService: PrismaService) {}

  async createOne(
    activity: MustHaveFields<
      Activity,
      'name' | 'description' | 'dateOfPerformance' | 'mode' | 'availability'
    >,
  ) {
    try {
      return await this.prismaService.activity.create({ data: activity });
    } catch (error) {
      throw error;
    }
  }

  async bookOne(activityId: Activity['id'], userId: User['id']) {
    try {
      const activity = await this.prismaService.activity.findFirst({
        where: { id: activityId },
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

      const updatedActivity = await this.prismaService.activity.update({
        where: { id: activity.id },
        data: {
          availability: activity.availability - 1,
          users: { connect: { id: userId } },
        },
      });

      return updatedActivity;
    } catch (error) {
      throw error;
    }
  }

  async unbookOne(activityId: Activity['id'], userId: User['id']) {
    try {
      await this.prismaService.activity.update({
        where: { id: activityId },
        data: { users: { disconnect: { id: userId } } },
      });
    } catch (error) {
      throw error;
    }
  }

  async getBookableActivities(userId: User['id']) {
    try {
      const activities = await this.prismaService.activity.findMany({
        where: {
          availability: { gt: 0 },
          NOT: { userIDs: { has: userId } },
        },
        select: {
          id: true,
          name: true,
          description: true,
          dateOfPerformance: true,
          mode: true,
          availability: true,
        },
      });

      if (!activities) {
        throw new AvailableActivitiesNotFoundException();
      }

      return activities;
    } catch (error) {
      throw error;
    }
  }
}
