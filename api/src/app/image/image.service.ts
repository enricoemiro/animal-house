import sharp from 'sharp';

export class ImageService {
  async resizeImages(images: Express.Multer.File[]) {
    return await Promise.all(
      [...images].map(async (image) => {
        const buffer: Buffer = await sharp(image.buffer)
          .resize({
            width: 512,
            height: 512,
          })
          .webp()
          .toBuffer();

        return {
          content: buffer,
        };
      }),
    );
  }
}
