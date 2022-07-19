import { SetMetadata } from '@nestjs/common';

export const REQUIRES_AUTH_KEY = 'requires_auth';

export const RequiresAuth = (requiresAuth: boolean) =>
  SetMetadata(REQUIRES_AUTH_KEY, requiresAuth);
