import { FileOptions } from '@/components/file/interfaces/file.interface';

export interface ImageOptions extends Pick<FileOptions, 'buffer'> {
  /**
   * Image owner id.
   */
  ownerId: string;

  /**
   * Image type.
   */
  type: ImageType;
}

export enum ImageType {
  PRODUCT = 'product',
}
