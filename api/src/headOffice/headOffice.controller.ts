import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  OnModuleInit,
  Post,
} from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { I18nService } from 'nestjs-i18n';

import { RequiresPermissions } from '@app/acl/acl.decorator';
import { ActivityService } from '@app/activity/activity.service';
import { RequiresAuth, SkipAuth } from '@app/auth/auth.decorator';
import { PaginateDto } from '@app/paginate/paginate.dto';
import { PermissionName } from '@app/permission/permission.schema';

import {
  HeadOfficeCreateDto,
  HeadOfficeDeleteDto,
  HeadOfficeUpdateDto,
  HeadOfficeUpdateServiceDto,
} from './headOffice.dto';
import { HeadOfficeService } from './headOffice.service';

@Controller('headOffice')
@RequiresAuth(true)
export class HeadOfficeController implements OnModuleInit {
  private activityService: ActivityService;

  public constructor(
    private headOfficeService: HeadOfficeService,
    private i18nService: I18nService,
    private moduleRef: ModuleRef,
  ) {}

  /**
   * Init activity service.
   *
   * @see {@link https://docs.nestjs.com/fundamentals/module-ref#retrieving-instances}
   */
  public onModuleInit() {
    this.activityService = this.moduleRef.get(ActivityService, {
      strict: false,
    });
  }

  @Post('create')
  @HttpCode(HttpStatus.OK)
  @RequiresPermissions(PermissionName.HEAD_OFFICE_CREATE)
  public async createHeadOffice(
    @Body() headOfficeCreateDto: HeadOfficeCreateDto,
  ) {
    await this.headOfficeService.create(headOfficeCreateDto);

    return {
      message: this.i18nService.t('headOffice.controller.createHeadOffice'),
    };
  }

  @Get('read')
  @HttpCode(HttpStatus.OK)
  @SkipAuth()
  public async read(@Body() { page, limit }: PaginateDto) {
    return await this.headOfficeService.paginate(page, limit);
  }

  @Post('update')
  @HttpCode(HttpStatus.OK)
  @RequiresPermissions(PermissionName.HEAD_OFFICE_UPDATE)
  public async update(
    @Body()
    headOfficeUpdateDto: HeadOfficeUpdateDto,
  ) {
    const headOffice = await this.headOfficeService.findById(
      headOfficeUpdateDto.id,
    );

    await this.headOfficeService.update(
      { _id: headOffice._id },
      {
        location: headOfficeUpdateDto.location,
        phone: headOfficeUpdateDto.phone,
        openingTime: headOfficeUpdateDto.openingTime,
        closingTime: headOfficeUpdateDto.closingTime,
      },
    );

    return {
      message: this.i18nService.t('headOffice.controller.updateHeadOffice'),
    };
  }

  @Post('update/activities')
  @HttpCode(HttpStatus.OK)
  @RequiresPermissions(PermissionName.HEAD_OFFICE_UPDATE)
  public async updateActivities(@Body() { id }: HeadOfficeUpdateServiceDto) {
    const headOffice = await this.headOfficeService.findById(id);
    const services = await this.activityService.findByHeadOfficeId(id);

    const addedServices = await this.headOfficeService.updateActivities(
      headOffice,
      services,
    );

    return {
      message: this.i18nService.t('headOffice.controller.updateServices', {
        args: {
          location: headOffice.location,
          activities: addedServices.join(', '),
          count: addedServices.length,
        },
      }),
    };
  }

  @Post('delete')
  @HttpCode(HttpStatus.OK)
  @RequiresPermissions(PermissionName.HEAD_OFFICE_DELETE)
  public async deleteHeadOffice(@Body() { location }: HeadOfficeDeleteDto) {
    await this.headOfficeService.delete(location);

    return {
      message: this.i18nService.t('headOffice.controller.deleteHeadOffice'),
    };
  }
}
