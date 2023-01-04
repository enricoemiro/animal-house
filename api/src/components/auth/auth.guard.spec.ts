import { Reflector } from '@nestjs/core';
import { Test } from '@nestjs/testing';
import { pick } from 'lodash';

import { createMockedExecutionContext } from '@mocks/execution-context.mock';
import { mockUser } from '@mocks/user.mock';

import { AuthGuard } from './auth.guard';
import { REQUIRES_AUTH_KEY } from './decorators/requires-auth.decorator';
import { AuthException } from './exceptions/auth.exception';
import { GuestException } from './exceptions/guest.exception';

describe('AuthGuard', () => {
  let authGuard: AuthGuard;
  let reflector: Reflector;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        AuthGuard,
        {
          provide: Reflector,
          useValue: { getAllAndOverride: jest.fn() },
        },
      ],
    }).compile();

    authGuard = moduleRef.get<AuthGuard>(AuthGuard);
    reflector = moduleRef.get<Reflector>(Reflector);
  });

  describe('canActivate', () => {
    let user: any;

    beforeEach(() => {
      user = pick(mockUser, ['id', 'email', 'permissions']) as any;
    });

    describe('requiresAuth', () => {
      beforeEach(() => {
        (reflector.getAllAndOverride as jest.Mock).mockImplementation(
          (key: any) => key === REQUIRES_AUTH_KEY,
        );
      });

      it('should return true if REQUIRES_AUTH_KEY is true and the user session is valid.', () => {
        const request = { session: { user, isOutdated: false } };
        const context = createMockedExecutionContext(request as any);

        expect(authGuard.canActivate(context)).toBe(true);
      });

      it('should throw an AuthException if REQUIRES_AUTH_KEY is true and the user session is invalid.', () => {
        // Failure case (1): user is not an object
        expect(() =>
          authGuard.canActivate(
            createMockedExecutionContext({ session: { isOutdated: false } } as any),
          ),
        );

        // Failure case (2): isOutdated is not a boolean
        expect(() =>
          authGuard.canActivate(createMockedExecutionContext({ session: { user } } as any)),
        );

        // Failure case (3): isOutdated is true
        expect(() =>
          authGuard.canActivate(
            createMockedExecutionContext({ session: { user, isOutdated: true } } as any),
          ),
        ).toThrow(AuthException);
      });
    });

    describe('guest', () => {
      beforeEach(() => {
        (reflector.getAllAndOverride as jest.Mock).mockImplementation((key: any) =>
          key === REQUIRES_AUTH_KEY ? false : true,
        );
      });

      it('should throw a GuestException if the session is not empty.', () => {
        // Failure case (1): user is not undefined
        expect(() =>
          authGuard.canActivate(createMockedExecutionContext({ session: { user } } as any)),
        ).toThrow(GuestException);

        // Failure case (2): isOutdated is not undefined
        expect(() =>
          authGuard.canActivate(
            createMockedExecutionContext({ session: { isOutdated: false } } as any),
          ),
        ).toThrow(GuestException);
      });

      it('should return true if the session is empty.', () => {
        expect(authGuard.canActivate(createMockedExecutionContext({ session: {} } as any))).toBe(
          true,
        );
      });
    });
  });
});
