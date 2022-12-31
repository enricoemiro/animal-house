import { Reflector } from '@nestjs/core';
import { Test, TestingModule } from '@nestjs/testing';

import { createMockedExecutionContext } from '@mocks/execution-context.mock';
import { mockUser, mockUserSession } from '@mocks/user.mock';

import { ACLGuard } from './acl.guard';
import { InvalidPermissionsException } from './exceptions/invalid-permissions.exception';

describe('ACLGuard', () => {
  let aclGuard: ACLGuard;
  let reflector: Reflector;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        ACLGuard,
        {
          provide: Reflector,
          useValue: { getAllAndMerge: jest.fn() },
        },
      ],
    }).compile();

    aclGuard = moduleRef.get<ACLGuard>(ACLGuard);
    reflector = moduleRef.get<Reflector>(Reflector);
  });

  describe('canActivate', () => {
    it('should return true if REQUIRES_PERMISSIONS_KEY is not set.', () => {
      const request = { session: mockUserSession() };
      (reflector.getAllAndMerge as jest.Mock).mockReturnValue([]);

      expect(aclGuard.canActivate(createMockedExecutionContext(request as any))).toBe(true);
    });

    it('should allow access if the user has required permissions.', () => {
      const request = { session: mockUserSession(mockUser({ permissions: ['write'] })) };
      (reflector.getAllAndMerge as jest.Mock).mockReturnValue(['write']);

      expect(aclGuard.canActivate(createMockedExecutionContext(request as any))).toBe(true);
    });

    it('should throw an InvalidPermissionsException if the user does not have the required permissions.', () => {
      const request = { session: mockUserSession(mockUser({ permissions: ['read'] }), true) };
      (reflector.getAllAndMerge as jest.Mock).mockReturnValue(['write']);

      expect(() => aclGuard.canActivate(createMockedExecutionContext(request as any))).toThrow(
        InvalidPermissionsException,
      );
    });
  });
});
