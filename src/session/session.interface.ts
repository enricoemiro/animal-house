import { Types } from 'mongoose';

import { PermissionName } from '@app/permission/permission.schema';

export interface UserSession {
  /**
   * User id.
   */
  id: Types.ObjectId;

  /**
   * User email.
   */
  email: string;

  /**
   * User permissions.
   */
  permissions: PermissionName[];

  /**
   * This flag indicates whether the user is blocked.
   */
  isBlocked: boolean;

  /**
   * This flag indicates whether the session is valid.
   */
  isOutdated: boolean;
}

declare module 'express-session' {
  interface SessionData {
    user: UserSession;
  }
}
