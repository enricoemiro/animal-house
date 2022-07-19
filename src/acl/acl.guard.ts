import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Types } from 'mongoose';

import { PermissionName } from '@app/permission/permission.schema';
import { PermissionService } from '@app/permission/permission.service';
import { UserService } from '@app/user/user.service';

import { REQUIRES_PERMISSIONS_KEY } from './acl.decorator';
import { AclGuardException } from './acl.exception';

@Injectable()
export class AclGuard implements CanActivate {
  public constructor(
    private userService: UserService,
    private permissionService: PermissionService,
    private reflector: Reflector,
  ) {}

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const names = this.reflector.getAllAndMerge<PermissionName[]>(
      REQUIRES_PERMISSIONS_KEY,
      [context.getHandler(), context.getClass()],
    );

    const request = context.switchToHttp().getRequest();

    // The route does not require any permission
    if (names.length === 0) {
      return true;
    }

    return await this.can(request.session.user.id, names);
  }

  private async can(userId: Types.ObjectId, names: PermissionName[]) {
    try {
      const user = await this.userService.findById(userId);
      const permissions = await this.permissionService.findByNames(names);

      const hasPermissions = permissions.every((permission) =>
        user.permissions.includes(permission._id),
      );

      if (!hasPermissions) {
        throw new AclGuardException();
      }

      return true;
    } catch {
      throw new AclGuardException();
    }
  }
}
