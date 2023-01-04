import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PermissionName } from '@prisma/client';
import { Request } from 'express';

import { UserSession } from '@/components/user/interfaces/user-session.interface';

import { REQUIRES_PERMISSIONS_KEY } from './decorators/requires-permissions.decorator';
import { InvalidPermissionsException } from './exceptions/invalid-permissions.exception';

@Injectable()
export class ACLGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext) {
    const targets = [context.getHandler(), context.getClass()];
    const permissions = this.reflector.getAllAndMerge<PermissionName[]>(
      REQUIRES_PERMISSIONS_KEY,
      targets,
    );

    const request: Request = context.switchToHttp().getRequest();
    const session: any = request.session;

    if (!this.hasPermissions(session, permissions)) {
      throw new InvalidPermissionsException();
    }

    return true;
  }

  private hasPermissions({ user }: UserSession, permissions: PermissionName[]) {
    return permissions.every((permission) => user.permissions.includes(permission));
  }
}
