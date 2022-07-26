import { Controller, Get } from '@nestjs/common';

import { RequiresPermissions } from '@app/acl/acl.decorator';
import { RequiresAuth } from '@app/auth/auth.decorator';

import { PermissionName } from './permission.schema';
import { PermissionService } from './permission.service';

@Controller('permission')
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
