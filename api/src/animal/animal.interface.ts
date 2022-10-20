import { Types } from 'mongoose';

import { Animal } from './animal.schema';

export class AnimalWithId extends Animal {
  _id?: Types.ObjectId;
}
