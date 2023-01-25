import { Body, Controller, Get, Post, Session } from '@nestjs/common';

import { RequiresAuth } from '@/components/auth/decorators/requires-auth.decorator';
import { UserSession } from '@/components/user/interfaces/user-session.interface';

import { ActivityService } from './activity.service';
import { BookDTO } from './dtos/book.dto';
import { CreateDTO } from './dtos/create.dto';
import { UnbookDTO } from './dtos/unbook.dto';

@Controller('activity')
@RequiresAuth(true)
export class ActivityController {
  constructor(private activityService: ActivityService) { }

  @Post('create')
  async create(@Body() createDTO: CreateDTO) {
    await this.activityService.createOne(createDTO);
    return { message: 'The activity has been successfully created.' };
  }

  @Get('get/bookable/activities')
  async getBookableActivities(@Session() { user }: UserSession) {
    const activities = await this.activityService.getBookableActivities(user.id);
    return { activities };
  }

  @Post('book')
  async book(@Body() { id }: BookDTO, @Session() session: UserSession) {
    await this.activityService.bookOne(id, session.user.id);
    return { message: 'The activity has been successfully booked.' };
  }

  @Post('unbook')
  async unbook(@Body() { id }: UnbookDTO, @Session() session: UserSession) {
    await this.activityService.unbookOne(id, session.user.id);
    return { message: 'The activity has been successfully unbooked.' };
  }

  @Get('get/activities')
  async getActivities() {
    const activities = await this.activityService.getActivities();
    return activities;
  }

  @Get('get/live/activities')
  async getLiveActivities() {
    const activities = await this.activityService.getLiveActivities();
    return activities;
  }

  @Get('get/online/activities')
  async getOnlineActivities() {
    const activities = await this.activityService.getOnlineActivities();
    return activities;
  }
}
