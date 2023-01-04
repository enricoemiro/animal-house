import { Module } from '@nestjs/common';

import { PrismaService } from '@/config/prisma/prisma';

import { ProductController } from './product.controller';
import { ProductService } from './product.service';

@Module({
  providers: [PrismaService, ProductService],
  controllers: [ProductController],
  exports: [ProductService],
})
export class ProductModule {}
