import { Types } from 'mongoose';

import { User } from './user.schema';

export class UserWithId extends User {
  _id?: Types.ObjectId;
}
