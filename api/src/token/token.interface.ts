import { Types } from 'mongoose';

import { Token } from './token.schema';

export class TokenWithId extends Token {
  _id: Types.ObjectId;
}
