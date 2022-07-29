import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Session,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { I18nService } from 'nestjs-i18n';

import { RequiresPermissions } from '@app/acl/acl.decorator';
import { RequiresAuth, RequiresNotOnSelf } from '@app/auth/auth.decorator';
import { HasherService } from '@app/hasher/hasher.service';
import { ImageType } from '@app/image/image.interface';
import { ImageFilePipe } from '@app/image/image.pipe';
import { ImageService } from '@app/image/image.service';
import { PaginateDto } from '@app/paginate/paginate.dto';
import { PermissionName } from '@app/permission/permission.schema';
import { PermissionService } from '@app/permission/permission.service';
import { SessionService } from '@app/session/session.service';

import {
  UserBlockAccountDto,
  UserPermissionsDto,
  UserUnblockAccountDto,
  UserUpdateAccountDto,
  UserUpdatePasswordDto,
} from './user.dto';
import { UserCouldNotBeDeleted } from './user.exception';
import { UserService } from './user.service';

@Controller('user')
@RequiresAuth(true)
export class UserController {
  public constructor(
    private userService: UserService,
    private permissionService: PermissionService,
    private i18nService: I18nService,
    private hasherService: HasherService,
    private sessionService: SessionService,
    private imageService: ImageService,
  ) {}

  @Get('read')
  @RequiresPermissions(PermissionName.USER_READ)
  public async read(@Body() { page, limit }: PaginateDto) {
    const result = await this.userService.paginate(page, limit);

    return result;
  }

  @Post('block/account')
  @HttpCode(HttpStatus.OK)
  @RequiresNotOnSelf()
  @RequiresPermissions(PermissionName.USER_BLOCK_ACCOUNT)
  public async blockAccount(@Body() { email }: UserBlockAccountDto) {
    const user = await this.userService.findByEmail(email);

    await this.userService.block(user);
    await this.sessionService.revoke(user._id);

    return {
      message: this.i18nService.t('user.controller.blockAccount', {
        args: { email },
      }),
    };
  }

  @Post('unblock/account')
  @HttpCode(HttpStatus.OK)
  @RequiresNotOnSelf()
  @RequiresPermissions(PermissionName.USER_UNBLOCK_ACCOUNT)
  public async unblockAccount(@Body() { email }: UserUnblockAccountDto) {
    const user = await this.userService.findByEmail(email);

    await this.userService.unblock(user);
    await this.sessionService.invalidate(user._id);

    return {
      message: this.i18nService.t('user.controller.unblockAccount', {
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

    if (userUpdateAccountDto.email) {
      await this.sessionService.invalidate(session.user.id);
    }

    return {
      message: this.i18nService.t('user.controller.updateAccount'),
    };
  }

  @Post('delete/account')
  @HttpCode(HttpStatus.OK)
  public async deleteAccount(@Session() session: Record<string, any>) {
    const result = await this.userService.deleteById(session.user.id);

    if (result.deletedCount === 0) {
      throw new UserCouldNotBeDeleted();
    }

    await session.destroy();

    return {
      message: this.i18nService.t('user.controller.deleteAccount'),
    };
  }

  @Post('update/account/picture')
  @UseInterceptors(FileInterceptor('picture'))
  public async updateAccountPicture(
    @UploadedFile(ImageFilePipe) picture: Express.Multer.File,
    @Session() session: Record<string, any>,
  ) {
    await this.imageService.create({
      ownerId: session.user.id,
      type: ImageType.USER,
      buffer: picture.buffer,
    });

    return {
      message: this.i18nService.t('user.controller.updateAccountPicture'),
    };
  }

  @Post('delete/account/picture')
  public async deleteAccountPicture(@Session() session: Record<string, any>) {
    await this.imageService.delete({
      ownerId: session.user.id,
      type: ImageType.USER,
    });

    return {
      message: this.i18nService.t('user.controller.deleteAccountPicture'),
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

    await this.hasherService.compare(oldPassword, user.password);
    await this.userService.updatePassword(user, newPassword);

    return {
      message: this.i18nService.t('user.controller.updatePassword'),
    };
  }

  @Post('update/permissions')
  @HttpCode(HttpStatus.OK)
  @RequiresNotOnSelf()
  @RequiresPermissions(PermissionName.USER_UPDATE_PERMISSIONS)
  public async updatePermissions(@Body() { email, names }: UserPermissionsDto) {
    const user = await this.userService.findByEmail(email);

    const addedPermissions = await this.userService.updatePermissions(
      user,
      await this.permissionService.findByNames(names),
    );

    if (addedPermissions.length > 0) {
      await this.sessionService.invalidate(user._id);
    }

    return {
      message: this.i18nService.t('user.controller.updatePermissions', {
        args: {
          email,
          permissions: addedPermissions.join(', '),
          count: addedPermissions.length,
        },
      }),
    };
  }

  @Post('delete/permissions')
  @HttpCode(HttpStatus.OK)
  @RequiresNotOnSelf()
  @RequiresPermissions(PermissionName.USER_DELETE_PERMISSIONS)
  public async deletePermissions(@Body() { email, names }: UserPermissionsDto) {
    const user = await this.userService.findByEmail(email);

    const deletedPermissions = await this.userService.deletePermissions(
      user,
      await this.permissionService.findByNames(names),
    );

    if (deletedPermissions.length > 0) {
      await this.sessionService.invalidate(user._id);
    }

    return {
      message: this.i18nService.t('user.controller.deletePermissions', {
        args: {
          email,
          permissions: deletedPermissions.join(', '),
          count: deletedPermissions.length,
        },
      }),
    };
  }
}
