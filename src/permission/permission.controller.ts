import { Controller, Get, UseGuards } from '@nestjs/common';

import { RequiresPermissions } from '@app/acl/acl.decorator';
import { AclGuard } from '@app/acl/acl.guard';
import { RequiresAuth } from '@app/auth/auth.decorator';
import { AuthGuard } from '@app/auth/auth.guard';

import { PermissionName } from './permission.schema';
import { PermissionService } from './permission.service';

@Controller('permission')
@UseGuards(AuthGuard, AclGuard)
@RequiresAuth(true)
export class PermissionController {
  public constructor(private permissionService: PermissionService) {}

  @Get('read/all')
  @RequiresPermissions(PermissionName.PERMISSION_READ_ALL)
  public async readAll() {
    const permissions = await this.permissionService.findAll();

    return {
      permissions,
    };
  }
}
