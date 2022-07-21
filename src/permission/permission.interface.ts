import { Types } from 'mongoose';

import { Permission } from './permission.schema';

export class PermissionWithId extends Permission {
  _id: Types.ObjectId;
}
