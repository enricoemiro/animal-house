import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Session,
  UseGuards,
} from '@nestjs/common';
import { I18nService } from 'nestjs-i18n';

import { RequiresPermissions } from '@app/acl/acl.decorator';
import { AclGuard } from '@app/acl/acl.guard';
import { RequiresAuth } from '@app/auth/auth.decorator';
import { AuthGuard } from '@app/auth/auth.guard';
import { PermissionName } from '@app/permission/permission.schema';
import { PermissionService } from '@app/permission/permission.service';

import { UserPermissionsDto, UserUpdateAccountDto } from './user.dto';
import { UserService } from './user.service';

@Controller('user')
@UseGuards(AuthGuard, AclGuard)
@RequiresAuth(true)
export class UserController {
  public constructor(
    private userService: UserService,
    private permissionService: PermissionService,
    private i18nService: I18nService,
  ) {}

  @Post('update/account')
  @HttpCode(HttpStatus.OK)
  public async updateAccount(
    @Session() session: Record<string, any>,
    @Body() userUpdateAccountDto: UserUpdateAccountDto,
  ) {
    if (Object.keys(userUpdateAccountDto).length === 0) {
      throw new BadRequestException();
    }

    await this.userService.update(
      { _id: session.user.id },
      userUpdateAccountDto,
    );

    return {
      message: this.i18nService.t('user.controller.updateAccount'),
    };
  }

  @Post('update/permissions')
  @HttpCode(HttpStatus.OK)
  @RequiresPermissions(PermissionName.USER_UPDATE_PERMISSIONS)
  public async updatePermissions(@Body() { email, names }: UserPermissionsDto) {
    const user = await this.userService.findByEmail(email);
    const permissions = await this.permissionService.findByNames(names);

    await this.userService.updatePermissions(user, permissions);

    return {
      message: this.i18nService.t('user.controller.updatePermissions', {
        args: {
          email,
          permissions: names.join(', '),
          count: names.length,
        },
      }),
    };
  }

  @Post('delete/permissions')
  @HttpCode(HttpStatus.OK)
  @RequiresPermissions(PermissionName.USER_DELETE_PERMISSIONS)
  public async deletePermissions(@Body() { email, names }: UserPermissionsDto) {
    const user = await this.userService.findByEmail(email);
    const permissions = await this.permissionService.findByNames(names);

    await this.userService.deletePermissions(user, permissions);

    return {
      message: this.i18nService.t('user.controller.deletePermissions', {
        args: {
          email,
          permissions: names.join(', '),
          count: names.length,
        },
      }),
    };
  }
}
