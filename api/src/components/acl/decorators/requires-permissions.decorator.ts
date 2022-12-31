import { SetMetadata } from '@nestjs/common';
import { PermissionName } from '@prisma/client';

export const REQUIRES_PERMISSIONS_KEY = 'requiresPermissions';

/**
 * Applies the RequiresPermissions decorator to a route.
 *
 * When this decorator is applied to a route, it means that the route can only be executed if the
 * user has the specified permissions.
 */
export const RequiresPermissions = (...permissions: PermissionName[]) =>
  SetMetadata(REQUIRES_PERMISSIONS_KEY, permissions);
