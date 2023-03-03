import { Body, Controller, Get, Param, Post, Session } from '@nestjs/common';

import { RequiresAuth } from '@/app/auth/decorators/requires-auth.decorator';
import { UserSession } from '@/app/user/interfaces/user-session.interface';

import { CreateDTO } from './dtos/create.dto';
import { GetActivitiesByHeadOfficeIdDTO } from './dtos/get-activities-by-headoffice-id.dto';
import { HeadOfficeService } from './headOffice.service';

@Controller('/api/v1/headoffice')
@RequiresAuth(true)
export class HeadOfficeController {
  constructor(private readonly headOfficeService: HeadOfficeService) {}

  @Post('create')
  async create(@Body() createDTO: CreateDTO) {
    await this.headOfficeService.createOne(createDTO);

    return {
      message: 'The headoffice has been successfully created.',
    };
  }

  @Get('get/all/locations')
  async getAllLocations() {
    const headoffices = await this.headOfficeService.getAllLocations();

    return {
      headoffices: headoffices || [],
    };
  }

  @Get(':id/activities')
  async getActivitiesByHeadOfficeId(
    @Param() { id }: GetActivitiesByHeadOfficeIdDTO,
    @Session() { user }: UserSession,
  ) {
    const activities = await this.headOfficeService.getActivitiesByHeadOfficeId(id, user.id);

    return {
      activities: activities || [],
    };
  }
}
