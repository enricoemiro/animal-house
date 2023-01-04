import { User } from '@prisma/client';

export interface UserSession {
  /**
   * The authenticated user.
   * The user's data is stored in this property.
   */
  user: Pick<User, 'id' | 'email' | 'permissions'>;

  /**
   * Indicates whether the user's data stored in this session is valid.
   * A user's data may become invalid if, for example, the user changes their email or an admin
   * blocks the user.
   */
  isOutdated: boolean;
}

declare module 'express-session' {
  interface SessionData extends UserSession {}
}
