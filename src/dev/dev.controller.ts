import { faker } from '@faker-js/faker';
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { I18nService } from 'nestjs-i18n';

import { PermissionName } from '@app/permission/permission.schema';
import { PermissionService } from '@app/permission/permission.service';
import { UserService } from '@app/user/user.service';

import { DevCreateAdminDto } from './dev.dto';
import { DevGuard } from './dev.guard';

@Controller('dev')
@UseGuards(DevGuard)
export class DevController {
  public constructor(
    private userService: UserService,
    private permissionService: PermissionService,
    private i18nService: I18nService,
  ) {}

  @Post('admin/create')
  @HttpCode(HttpStatus.OK)
  public async createAdmin(@Body() devCreateAdminDto: DevCreateAdminDto) {
    const user = await this.userService.create(devCreateAdminDto);
    const permissions = await this.permissionService.findAll();

    await this.userService.updatePermissions(user, permissions);
    await this.userService.activate(user);

    return {
      message: this.i18nService.t('dev.controller.createAdmin', {
        args: {
          email: user.email,
        },
      }),
    };
  }

  @Get('permission/create')
  public async createAllPermissions() {
    let permissions = await this.permissionService.createFromNames(
      Object.values(PermissionName),
    );

    permissions = permissions.map((permission) => permission.name);

    return {
      message: this.i18nService.t('dev.controller.createAllPermissions', {
        args: {
          permissions: permissions.join(', '),
          count: permissions.length,
        },
      }),
    };
  }

  @Get('permission/delete')
  public async deleteAllPermissions() {
    await this.permissionService.deleteAll();

    return {
      message: this.i18nService.t('dev.controller.deleteAllPermissions'),
    };
  }

  @Get('user/create/:quantity')
  @HttpCode(HttpStatus.OK)
  public async createUsers(@Param('quantity', ParseIntPipe) quantity: number) {
    const users: any[] = [];

    const createRandomUser = function () {
      return {
        name: faker.name.findName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        dateOfBirth: faker.date.birthdate(),
        gender: faker.name.gender(true).toLowerCase(),
        address: faker.address.streetAddress(),
        isActive: true,
      };
    };

    Array.from({ length: quantity }).forEach(() => {
      users.push(createRandomUser());
    });

    const usersAdded = await this.userService.createMany(users);

    return {
      message: this.i18nService.t('dev.controller.createUsers', {
        args: { count: usersAdded.length },
      }),
    };
  }

  @Get('user/delete')
  @HttpCode(HttpStatus.OK)
  public async deleteAllUsers() {
    await this.userService.deleteAll();

    return {
      message: this.i18nService.t('dev.controller.deleteAllUsers'),
    };
  }
}
