import { Module } from '@nestjs/common';

import { PrismaService } from '@/config/prisma/prisma';

import { ImageModule } from '../image/image.module';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';

@Module({
  imports: [ImageModule],
  providers: [PrismaService, ProductService],
  controllers: [ProductController],
  exports: [ProductService],
})
export class ProductModule {}
