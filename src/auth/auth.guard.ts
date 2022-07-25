import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';

import { UserSession } from '@app/session/session.interface';
import { SessionService } from '@app/session/session.service';
import { UserService } from '@app/user/user.service';

import { REQUIRES_AUTH_KEY, REQUIRES_NOT_ON_SELF_KEY } from './auth.decorator';
import {
  AuthGuardException,
  AuthGuardNotOnSelfException,
} from './auth.exception';

@Injectable()
export class AuthGuard implements CanActivate {
  public constructor(
    private reflector: Reflector,
    private sessionService: SessionService,
    private userService: UserService,
  ) {}

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiresAuth = this.reflector.getAllAndOverride<boolean>(
      REQUIRES_AUTH_KEY,
      [context.getHandler(), context.getClass()],
    );

    const requiresNotOnSelf = this.reflector.getAllAndOverride<boolean>(
      REQUIRES_NOT_ON_SELF_KEY,
      [context.getHandler(), context.getClass()],
    );

    const request: Request = context.switchToHttp().getRequest();

    if (requiresAuth) {
      const auth = await this.auth(request);

      if (requiresNotOnSelf) {
        return auth && this.notOnSelf(request);
      }

      return auth;
    }

    return this.noAuth(request);
  }

  private async auth(request: Request) {
    const userSession: UserSession = request.session?.user;

    if (userSession && !userSession.isOutdated && !userSession.isBlocked) {
      return true;
    }

    if (userSession && userSession?.isOutdated) {
      const user = await this.userService.findById(userSession.id);
      request.session.user = this.sessionService.createFromUserDocument(user);

      return true;
    }

    // This happens when the user is not logged in and try to access a
    // route that does require authentication.
    throw new AuthGuardException();
  }

  private noAuth(request: Request) {
    if (!request.session?.user) {
      return true;
    }

    // This happens when the user is logged in and try to access a route
    // that does not require authentication.
    // E.g.: the user wants to access the route /register
    throw new AuthGuardException();
  }

  private notOnSelf(request: Request) {
    const { email } = request.body || {};

    if (email === request.session.user.email) {
      throw new AuthGuardNotOnSelfException();
    }

    return true;
  }
}
