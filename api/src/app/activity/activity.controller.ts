import { Body, Controller, Get, Post, Session } from '@nestjs/common';

import { RequiresAuth } from '@/app/auth/decorators/requires-auth.decorator';
import { UserSession } from '@/app/user/interfaces/user-session.interface';

import { SkipAuth } from '../auth/decorators/skip-auth.decorator';
import { ActivityService } from './activity.service';
import { BookDTO } from './dtos/book.dto';
import { CreateDTO } from './dtos/create.dto';
import { UnbookDTO } from './dtos/unbook.dto';
import { ActivityNotFoundException } from './exceptions/activity-not-found.exception';

@Controller('/api/v1/activity')
@RequiresAuth(true)
export class ActivityController {
  constructor(private readonly activityService: ActivityService) {}

  @Post('create')
  async create(@Body() createDTO: CreateDTO) {
    await this.activityService.createOne(createDTO);

    return {
      message: 'The activity has been successfully created.',
    };
  }

  @Get('get/bookable/activities')
  async getBookableActivities(@Session() { user }: UserSession) {
    const activities = await this.activityService.getBookableActivities(user.id);

    return {
      activities: activities,
    };
  }

  @Get('get/preview')
  @SkipAuth()
  async getPreview() {
    const activities = await this.activityService.getPreview();

    if (!activities) {
      throw new ActivityNotFoundException();
    }
    return activities;
  }

  @Post('book')
  async book(@Body() { id }: BookDTO, @Session() session: UserSession) {
    await this.activityService.bookOne(id, session.user.id);

    return {
      message: 'The activity has been successfully booked.',
    };
  }

  @Post('unbook')
  async unbook(@Body() { id }: UnbookDTO, @Session() session: UserSession) {
    await this.activityService.unbookOne(id, session.user.id);

    return {
      message: 'The activity has been successfully unbooked.',
    };
  }
}
