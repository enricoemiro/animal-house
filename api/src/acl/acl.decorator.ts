import { SetMetadata } from '@nestjs/common';

import { PermissionName } from '@app/permission/permission.schema';

export const REQUIRES_PERMISSIONS_KEY = 'permissions';

export const RequiresPermissions = (...permissions: PermissionName[]) =>
  SetMetadata(REQUIRES_PERMISSIONS_KEY, permissions);
