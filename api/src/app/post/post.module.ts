import { Module } from '@nestjs/common';

import { PrismaModule } from '@/config/prisma/prisma.module';

import { ImageModule } from '../image/image.module';
import { PostController } from './post.controller';
import { PostService } from './post.service';

@Module({
  imports: [PrismaModule, ImageModule],
  controllers: [PostController],
  providers: [PostService],
  exports: [PostService],
})
export class PostModule {}
