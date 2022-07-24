import { SetMetadata } from '@nestjs/common';

export const REQUIRES_AUTH_KEY = 'requiresAuth';
export const REQUIRES_NOT_ON_SELF_KEY = 'requiresNotOnSelf';

export const RequiresAuth = (requiresAuth: boolean) =>
  SetMetadata(REQUIRES_AUTH_KEY, requiresAuth);

export const RequiresNotOnSelf = (requiresNotOnSelf: boolean) =>
  SetMetadata(REQUIRES_NOT_ON_SELF_KEY, requiresNotOnSelf);
