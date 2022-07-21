import { SetMetadata } from '@nestjs/common';

export const REQUIRES_AUTH_KEY = 'requiresAuth';
export const REQUIRES_NOT_ON_SELF_KEY = 'requiresNotOnSelf';
export const SKIP_AUTH_KEY = 'skipAuth';

export const RequiresAuth = (requiresAuth: boolean) =>
  SetMetadata(REQUIRES_AUTH_KEY, requiresAuth);

export const RequiresNotOnSelf = () =>
  SetMetadata(REQUIRES_NOT_ON_SELF_KEY, true);

export const SkipAuth = () => SetMetadata(SKIP_AUTH_KEY, true);
