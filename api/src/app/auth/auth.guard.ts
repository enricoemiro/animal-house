import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';

import { UserSession } from '@/app/user/interfaces/user-session.interface';

import { REQUIRES_AUTH_KEY } from './decorators/requires-auth.decorator';
import { SKIP_AUTH_KEY } from './decorators/skip-auth.decorator';
import { AuthException } from './exceptions/auth.exception';
import { GuestException } from './exceptions/guest.exception';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const request: Request = context.switchToHttp().getRequest();
    const session: any = request.session;
    const targets = [context.getHandler(), context.getClass()];

    const skipAuth = this.reflector.getAllAndOverride<boolean>(SKIP_AUTH_KEY, targets);
    const requiresAuth = this.reflector.getAllAndOverride<boolean>(REQUIRES_AUTH_KEY, targets);

    if (skipAuth) {
      return true;
    }

    if (requiresAuth) {
      const auth = this.checkAuth(session);

      return auth;
    }

    return this.checkGuest(session);
  }

  private checkAuth({ user, isOutdated }: UserSession) {
    // This happens when the user is not logged in and try to access a route that does require
    // authentication. E.g: the user wants to access the route "/logout".
    if (typeof user !== 'object' || typeof isOutdated !== 'boolean' || isOutdated) {
      throw new AuthException();
    }

    return true;
  }

  private checkGuest({ user, isOutdated }: UserSession) {
    // This happens when the user is logged in and try to access a route that does not require
    // authentication. E.g.: the user wants to access the route "/login"
    if (typeof user !== 'undefined' || typeof isOutdated !== 'undefined') {
      throw new GuestException();
    }

    return true;
  }
}
