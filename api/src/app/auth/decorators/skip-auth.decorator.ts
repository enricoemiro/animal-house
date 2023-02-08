import { SetMetadata } from '@nestjs/common';

export const SKIP_AUTH_KEY = 'SKIP_AUTH_KEY';

/**
 * When this decorator is applied to a route, it means that the route does not require any
 * authentication or permission. Use with caution!
 */
export const SkipAuth = () => SetMetadata(SKIP_AUTH_KEY, true);
