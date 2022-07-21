import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  InternalServerErrorException,
  NotFoundException,
  Post,
  Session,
  UseGuards,
} from '@nestjs/common';
import { I18nService } from 'nestjs-i18n';

import { RequiresPermissions } from '@app/acl/acl.decorator';
import { AclGuard } from '@app/acl/acl.guard';
import { RequiresAuth } from '@app/auth/auth.decorator';
import { AuthGuard } from '@app/auth/auth.guard';
import { HasherService } from '@app/hasher/hasher.service';
import { PermissionName } from '@app/permission/permission.schema';
import { PermissionService } from '@app/permission/permission.service';
import { SessionService } from '@app/session/session.service';

import {
  UserBlockAccountDto,
  UserPermissionsDto,
  UserUpdateAccountDto,
  UserUpdatePasswordDto,
} from './user.dto';
import { UserPasswordMismatchException } from './user.exception';
import { Status } from './user.schema';
import { UserService } from './user.service';

@Controller('user')
@UseGuards(AuthGuard, AclGuard)
@RequiresAuth(true)
export class UserController {
  public constructor(
    private userService: UserService,
    private permissionService: PermissionService,
    private i18nService: I18nService,
    private hasherService: HasherService,
    private sessionService: SessionService,
  ) {}

  @Post('block/account')
  @HttpCode(HttpStatus.OK)
  @RequiresPermissions(PermissionName.USER_BLOCK_ACCOUNT)
  public async blockAccount(
    @Body() { email }: UserBlockAccountDto,
    @Session() session: Record<string, any>,
  ) {
    const user = await this.userService.findByEmail(email);

    if (user._id.equals(session.user.id)) {
      throw new NotFoundException();
    }

    await this.sessionService.revoke(user._id);
    await this.userService.updateStatus(user, Status.BLOCKED);

    return {
      message: this.i18nService.t('user.controller.blockAccount', {
        args: { email },
      }),
    };
  }

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

  @Post('delete/account')
  @HttpCode(HttpStatus.OK)
  public async deleteAccount(@Session() session: Record<string, any>) {
    const result = await this.userService.deleteById(session.user.id);

    if (result.deletedCount === 0) {
      throw new InternalServerErrorException();
    }

    await session.destroy();

    return {
      message: this.i18nService.t('user.controller.deleteAccount'),
    };
  }

  @Post('update/password')
  @HttpCode(HttpStatus.OK)
  public async updatePassword(
    @Body()
    { password: oldPassword, newPassword }: UserUpdatePasswordDto,
    @Session() session: Record<string, any>,
  ) {
    const user = await this.userService.findById(session.user.id);

    const doPasswordsMatch = await this.hasherService.compare(
      oldPassword,
      user.password,
    );

    if (!doPasswordsMatch) {
      throw new UserPasswordMismatchException();
    }

    await this.userService.updatePassword(user, newPassword);

    return {
      message: this.i18nService.t('user.controller.updatePassword'),
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
