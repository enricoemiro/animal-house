import { User } from '@prisma/client';

import { UserSession } from '@/app/user/interfaces/user-session.interface';

export const defaultUser: User = {
  id: '123',
  name: 'test',
  email: 'test@example.com',
  password: 'test',
  gender: 'MALE',
  dateOfBirth: '2023-01-01',
  isBlocked: false,
  permissions: [],
  createdAt: new Date('January 01, 2023 00:00:00'),
  updatedAt: new Date('January 01, 2023 00:00:00'),
};

export const mockUser = (overrides?: Partial<User>): User => {
  return {
    ...defaultUser,
    ...overrides,
  };
};

export const mockUserSession = (
  userOverrides?: Partial<User>,
  isOutdatedOverride?: boolean,
): UserSession => {
  const { user, isOutdated }: UserSession = {
    user: {
      id: defaultUser.id,
      email: defaultUser.email,
      permissions: defaultUser.permissions,
    },
    isOutdated: false,
  };

  return {
    user: { ...user, ...userOverrides },
    isOutdated: isOutdatedOverride ?? isOutdated,
  };
};
