import { Injectable } from '@nestjs/common';
import sharp, { ResizeOptions } from 'sharp';

import { FileService } from '@app/file/file.service';

import { ImageOptions, ImageType } from './image.interface';

@Injectable()
export class ImageService {
  public constructor(private fileService: FileService) {}

  public async create(imageOptions: ImageOptions) {
    const webpBuffer = await this.toWebp(imageOptions.buffer);

    return this.fileService.create({
      path: `${this.buildPath(imageOptions)}.webp`,
      buffer: webpBuffer,
    });
  }

  public async delete(imageOptions: Omit<ImageOptions, 'buffer'>) {
    return this.fileService.delete({
      path: `${this.buildPath(imageOptions)}.webp`,
    });
  }

  /**
   * Return the file path.
   *
   * @param fileOptions File options.
   * @returns the file path.
   */
  private buildPath({ ownerId, type }: Omit<ImageOptions, 'buffer'>) {
    switch (type) {
      case ImageType.USER:
        return `users/${ownerId}`;
    }
  }

  /**
   * Convert an image to webp format.
   *
   * @param image Image buffer.
   * @param resizeOptions Sharp resize options (optional).
   * @returns Webp image buffer.
   */
  private async toWebp(
    image: Buffer,
    resizeOptions: ResizeOptions = { width: 512, height: 512 },
  ) {
    return sharp(image).resize(resizeOptions).webp().toBuffer();
  }
}
