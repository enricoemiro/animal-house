import { SetMetadata } from '@nestjs/common';

export const REQUIRES_AUTH_KEY = 'requiresAuth';

/**
 * Applies the RequiresAuth decorator to a route.
 *
 * When this decorator is applied to a route, it means that the route can only be executed if
 * the user is authenticated.
 */
export const RequiresAuth = (requiresAuth: boolean) => SetMetadata(REQUIRES_AUTH_KEY, requiresAuth);
