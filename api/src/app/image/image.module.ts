import { Module } from '@nestjs/common';

import { PrismaModule } from '@/config/prisma/prisma.module';

import { ImageService } from './image.service';

@Module({
  imports: [PrismaModule],
  providers: [ImageService],
  exports: [ImageService],
})
export class ImageModule {}
