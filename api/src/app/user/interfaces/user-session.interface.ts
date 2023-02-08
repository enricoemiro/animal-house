import { User } from '@prisma/client';
import { Session } from 'express-session';

export interface UserSession extends Session {
  /**
   * The authenticated user.
   * The user's data is stored in this property.
   */
  user: Pick<User, 'id' | 'name' | 'email' | 'role'>;

  /**
   * Indicates whether the user's data stored in this session is valid.
   * A user's data may become invalid if, for example, the user changes their email or an admin
   * blocks the user.
   */
  isOutdated: boolean;
}
