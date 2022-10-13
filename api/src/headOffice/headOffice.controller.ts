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
import { PaginateDto } from '@app/paginate/paginate.dto';
import { PermissionName } from '@app/permission/permission.schema';

import {
  HeadOfficeDto,
  HeadOfficeLocationDto,
  HeadOfficeUpdateDto,
} from './headOffice.dto';
import { HeadOfficeEmptyIdException } from './headOffice.exception';
import { HeadOfficeService } from './headOffice.service';

@Controller('headOffice')
@RequiresAuth(true)
export class HeadOfficeController {
  public constructor(
    private headOfficeService: HeadOfficeService,
    private i18nService: I18nService,
  ) {}

  @Post('create')
  @HttpCode(HttpStatus.OK)
  @RequiresPermissions(PermissionName.HEAD_OFFICE_CREATE)
  public async createHeadOffice(@Body() headOfficeDto: HeadOfficeDto) {
    await this.headOfficeService.create(headOfficeDto);

    return {
      message: this.i18nService.t('headOffice.controller.createHeadOffice'),
    };
  }

  @Post('delete')
  @HttpCode(HttpStatus.OK)
  @RequiresPermissions(PermissionName.HEAD_OFFICE_DELETE)
  public async deleteHeadOffice(@Body() { location }: HeadOfficeLocationDto) {
    await this.headOfficeService.delete(location);

    return {
      message: this.i18nService.t('headOffice.controller.deleteHeadOffice'),
    };
  }

  @Post('update')
  @HttpCode(HttpStatus.OK)
  @RequiresPermissions(PermissionName.HEAD_OFFICE_UPDATE)
  public async update(
    @Body()
    updateData: Partial<HeadOfficeUpdateDto>,
  ) {
    if (!updateData.id) {
      throw new HeadOfficeEmptyIdException();
    }
    const headOffice = await this.headOfficeService.findById(updateData.id);

    await this.headOfficeService.update(
      { _id: headOffice._id },
      {
        location: updateData.location,
        phone: updateData.phone,
        openingTime: updateData.openingTime,
        closingTime: updateData.closingTime,
      },
    );

    return {
      message: this.i18nService.t('headOffice.controller.updateHeadOffice'),
    };
  }

  @Get('read')
  @HttpCode(HttpStatus.OK)
  @SkipAuth()
  public async read(@Body() { page, limit }: PaginateDto) {
    return await this.headOfficeService.paginate(page, limit);
  }
}
