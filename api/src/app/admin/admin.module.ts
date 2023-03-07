import { Module } from '@nestjs/common';

import { AdminController } from '@/app/admin/admin.controller';
import { ImageModule } from '@/app/image/image.module';
import { PrismaModule } from '@/config/prisma/prisma.module';

import { ActivityModule } from '../activity/activity.module';
import { CategoryModule } from '../category/category.module';
import { HeadOfficeModule } from '../headOffice/headOffice.module';
import { ProductModule } from '../product/product.module';
import { UserModule } from '../user/user.module';
import { PostModule } from '../post/post.module';

@Module({
  imports: [
    ImageModule,
    PrismaModule,
    ProductModule,
    UserModule,
    ActivityModule,
    CategoryModule,
    HeadOfficeModule,
    PostModule,
  ],
  controllers: [AdminController],
})
export class AdminModule {}
