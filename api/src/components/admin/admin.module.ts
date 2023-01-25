import { Module } from '@nestjs/common';

import { PrismaService } from '@/config/prisma/prisma';

import { ImageModule } from '../image/image.module';
import { AdminController } from '../admin/admin.controller';
import { ProductService } from '../product/product.service';
import { UserService } from '../user/user.service';
import { ActivityService } from '../activity/activity.service';
import { CategoryService } from '../category/category.service';
import { HeadOfficeService } from '../headOffice/headOffice.service';

@Module({
    imports: [ImageModule],
    providers: [PrismaService, ProductService, UserService, ActivityService, CategoryService, HeadOfficeService],
    controllers: [AdminController],
    exports: [ProductService, UserService, ActivityService],
})
export class AdminModule { }