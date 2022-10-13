import { Types } from 'mongoose';

import { HeadOffice } from './headOffice.schema';

export class HeadOfficeWithId extends HeadOffice {
  _id?: Types.ObjectId;
}
