import { SetMetadata } from '@nestjs/common';

export const REQUIRES_AUTH_KEY = 'requiresAuth';

/**
 * This decorator controls the access to a route based on the value of 'requiresAuth'. If it's set
 * to true, the route can only be accessed by authenticated users, otherwise only non-authenticated
 * users can access it.
 */
export const RequiresAuth = (requiresAuth: boolean) => SetMetadata(REQUIRES_AUTH_KEY, requiresAuth);
