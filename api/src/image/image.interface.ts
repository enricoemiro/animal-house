import { Types } from 'mongoose';

import { FileOptions } from '@app/file/file.interface';

export interface ImageOptions extends Pick<FileOptions, 'buffer'> {
  /**
   * Image owner id.
   */
  ownerId: Types.ObjectId;

  /**
   * Image type.
   */
  type: ImageType;
}

export enum ImageType {
  USER = 'user',
  ANIMAL = 'animal',
}
