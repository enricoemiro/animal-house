import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { REQUIRES_AUTH_KEY } from './auth.decorator';
import { AuthGuardException } from './auth.exception';

@Injectable()
export class AuthGuard implements CanActivate {
  public constructor(private reflector: Reflector) {}

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiresAuth = this.reflector.getAllAndOverride<boolean>(
      REQUIRES_AUTH_KEY,
      [context.getHandler(), context.getClass()],
    );

    const request = context.switchToHttp().getRequest();

    return requiresAuth ? this.auth(request) : this.noAuth(request);
  }

  public auth(request: any) {
    if (request.session?.user) {
      return true;
    }

    // This happens when the user is not logged in and try to access a
    // route that does require authentication.
    throw new AuthGuardException();
  }

  public noAuth(request: any) {
    if (!request.session?.user) {
      return true;
    }

    // This happens when the user is logged in and try to access a route
    // that does not require authentication.
    // E.g.: the user wants to access the route /register
    throw new AuthGuardException();
  }
}
