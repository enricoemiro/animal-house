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
  constructor(private prismaService: PrismaService) { }

  async createOne(
    activity: MustHaveFields<
      Activity,
      'name' | 'description' | 'dateOfPerformance' | 'mode' | 'availability' | 'headOfficeId'
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

  async getActivities() {
    try {
      return await this.prismaService.activity.findMany({
        select: {
          id: true,
          name: true,
          description: true,
          dateOfPerformance: true,
          mode: true,
          availability: true,
          headOffice: true,
          users: { select: { email: true, id: true } },
        },
      })
    } catch (error) {
      throw error;
    }
  }

  async getLiveActivities() {
    try {
      const activities = await this.prismaService.activity.findMany({
        where: {
          mode: "IN_PERSON",
        },
        select: {
          id: true,
          name: true,
          description: true,
          dateOfPerformance: true,
          mode: true,
          availability: true,
          headOffice: true,
          users: { select: { email: true, id: true } },
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

  async getOnlineActivities() {
    try {
      const activities = await this.prismaService.activity.findMany({
        where: {
          mode: "ONLINE",
        },
        select: {
          id: true,
          name: true,
          description: true,
          dateOfPerformance: true,
          mode: true,
          availability: true,
          users: { select: { email: true, id: true } },
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

  async editActivity(
    id: Activity['id'],
    data: Partial<Pick<Activity, 'name' | 'description' | 'dateOfPerformance' | 'mode' | 'availability' | 'headOfficeId'>>,
  ) {
    try {
      if (Object.keys(data).length === 0) {
        return null;
      }

      return await this.prismaService.activity.update({
        where: { id },
        data,
      });
    } catch (error) {
      throw error;
    }
  }

  async deleteActivity(id: Activity['id']) {
    try {
      return this.prismaService.activity.delete({
        where: { id },
      });
    } catch (error) {
      throw error;
    }
  }
}
