import { SetMetadata } from '@nestjs/common';

export const REQUIRES_AUTH_KEY = 'requiresAuth';

export const RequiresAuth = (requiresAuth: boolean) =>
  SetMetadata(REQUIRES_AUTH_KEY, requiresAuth);
