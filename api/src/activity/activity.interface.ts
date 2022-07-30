import { Types } from 'mongoose';

import { Activity } from './activity.schema';

export class ActivityWithId extends Activity {
  _id?: Types.ObjectId;
}
