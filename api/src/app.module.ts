import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MulterModule } from '@nestjs/platform-express';

import { AppController } from './app.controller';
import { ActivityModule } from './app/activity/activity.module';
import { AdminModule } from './app/admin/admin.module';
import { AnimalModule } from './app/animal/animal.module';
import { AuthModule } from './app/auth/auth.module';
import { CategoryModule } from './app/category/category.module';
import { GameModule } from './app/game/game.module';
import { HeadOfficeModule } from './app/headOffice/headOffice.module';
import { ImageModule } from './app/image/image.module';
import { OrderModule } from './app/order/order.module';
import { PostModule } from './app/post/post.module';
import { ProductModule } from './app/product/product.module';
import { UserModule } from './app/user/user.module';
import { configModuleOptions } from './config/env.config';
import { multerModuleOptions } from './config/multer.config';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot(configModuleOptions),
    MulterModule.registerAsync(multerModuleOptions),
    AuthModule,
    AdminModule,
    UserModule,
    PostModule,
    UserModule,
    AnimalModule,
    HeadOfficeModule,
    ActivityModule,
    ImageModule,
    ProductModule,
    CategoryModule,
    OrderModule,
    GameModule,
  ],
  controllers: [AppController],
  exports: [MulterModule],
})
export class AppModule {}
