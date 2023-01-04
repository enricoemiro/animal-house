import { Body, Controller, Get, Param, Post, Put, Session } from '@nestjs/common';

import { RequiresAuth } from '@/components/auth/decorators/requires-auth.decorator';

import { UserSession } from '../user/interfaces/user-session.interface';
import { CreateDTO } from './dtos/create.dto';
import { GetActivitiesByHeadOfficeIdDTO } from './dtos/get-activities-by-headoffice-id.dto';
import { UpdateActivitiesDTO } from './dtos/update-activities.dto';
import { HeadOfficeActivitiesNotFoundException } from './exceptions/headoffice-activities-not-found.exception';
import { HeadOfficeService } from './headOffice.service';

@Controller('headoffice')
@RequiresAuth(true)
export class HeadOfficeController {
  constructor(private headOfficeService: HeadOfficeService) {}

  @Post('create')
  async create(@Body() createDTO: CreateDTO) {
    await this.headOfficeService.createOne(createDTO);
    return { message: 'The headoffice has been successfully created.' };
  }

  @Get('get/all/locations')
  async getAllLocations() {
    const headoffices = await this.headOfficeService.getAllLocations();
    return { headoffices };
  }

  @Get(':id/activities')
  async getActivitiesByHeadOfficeId(
    @Param() { id }: GetActivitiesByHeadOfficeIdDTO,
    @Session() { user }: UserSession,
  ) {
    const activities = await this.headOfficeService.getActivitiesByHeadOfficeId(id, user.id);

    if (!activities) {
      throw new HeadOfficeActivitiesNotFoundException();
    }

    return activities;
  }

  @Put(':id/activities/update')
  async updateActivities(@Body() { id: headOfficeID, activityIDs }: UpdateActivitiesDTO) {
    await this.headOfficeService.updateActivities(headOfficeID, activityIDs);
    return { message: 'All activities have been entered correctly.' };
  }
}
