import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { PermissionName } from '@app/permission/permission.schema';
import { UserSessionOptions } from '@app/session/session.interface';

import { REQUIRES_PERMISSIONS_KEY } from './acl.decorator';
import { AclGuardException } from './acl.exception';

@Injectable()
export class AclGuard implements CanActivate {
  public constructor(private reflector: Reflector) {}

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const permissions = this.reflector.getAllAndMerge<PermissionName[]>(
      REQUIRES_PERMISSIONS_KEY,
      [context.getHandler(), context.getClass()],
    );

    const request = context.switchToHttp().getRequest();

    if (
      permissions.length === 0 ||
      this.hasPermissions(request.session.user, permissions)
    ) {
      return true;
    }

    throw new AclGuardException();
  }

  private hasPermissions(
    user: UserSessionOptions,
    requiredPermissions: PermissionName[],
  ) {
    return requiredPermissions.every((permission) =>
      user.permissions.includes(permission),
    );
  }
}
