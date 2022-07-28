import { Module } from '@nestjs/common';

import { FileModule } from '@app/file/file.module';

import { ImageService } from './image.service';

@Module({
  imports: [FileModule],
  providers: [ImageService],
  exports: [ImageService, FileModule],
})
export class ImageModule {}