import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { I18nService } from 'nestjs-i18n';

import { RequiresPermissions } from '@app/acl/acl.decorator';
import { RequiresAuth, SkipAuth } from '@app/auth/auth.decorator';
import { HeadOfficeService } from '@app/headOffice/headOffice.service';
import { PaginateDto } from '@app/paginate/paginate.dto';
import { PermissionName } from '@app/permission/permission.schema';
import { UserService } from '@app/user/user.service';

import {
  ActivityDeleteDto,
  ActivityDto,
  ActivityUpdateDto,
} from './activity.dto';
import { ActivityService } from './activity.service';

@Controller('activity')
@RequiresAuth(true)
export class ActivityController {
  public constructor(
    private activityService: ActivityService,
    private i18nService: I18nService,
    private userService: UserService,
    private headOfficeService: HeadOfficeService,
  ) {}

  @Post('create')
  @HttpCode(HttpStatus.OK)
  @RequiresPermissions(PermissionName.ACTIVITY_CREATE)
  public async createActivity(@Body() activityDto: ActivityDto) {
    if (activityDto.ownerId != null) {
      await this.userService.findById(activityDto.ownerId);
    }
    if (activityDto.headOfficeId != null) {
      await this.headOfficeService.findById(activityDto.headOfficeId);
    }

    await this.activityService.create(activityDto);
    return {
      message: this.i18nService.t('activity.controller.createActivity'),
    };
  }

  @Get('read')
  @HttpCode(HttpStatus.OK)
  @SkipAuth()
  public async read(@Body() { page, limit }: PaginateDto) {
    return await this.activityService.paginate(page, limit);
  }

  @Post('update')
  @HttpCode(HttpStatus.OK)
  @RequiresPermissions(PermissionName.ACTIVITY_UPDATE)
  public async updateActivity(@Body() updateData: ActivityUpdateDto) {
    if (updateData.ownerId != null) {
      await this.userService.findById(updateData.ownerId);
    }
    if (updateData.headOfficeId != null) {
      await this.headOfficeService.findById(updateData.headOfficeId);
    }

    const activity = await this.activityService.findById(updateData.id);
    await this.activityService.update(
      { _id: activity._id },
      {
        name: updateData.name,
        mode: updateData.mode,
        description: updateData.description,
        price: updateData.price,
        dateOfPerformance: updateData.dateOfPerformance,
        ownerId: updateData.ownerId,
        headOfficeId: updateData.headOfficeId,
      },
    );

    return {
      message: this.i18nService.t('activity.controller.updateActivity'),
    };
  }

  @Post('delete')
  @HttpCode(HttpStatus.OK)
  @RequiresPermissions(PermissionName.ACTIVITY_DELETE)
  public async deleteActivity(@Body() activityDeleteDto: ActivityDeleteDto) {
    const activity = await this.activityService.findById(activityDeleteDto.id);

    await this.activityService.delete({ _id: activity._id });

    return {
      message: this.i18nService.t('activity.controller.deleteActivity'),
    };
  }
}
