import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';

import { configModuleOptions } from '@/config/env';

import { ActivityModule } from './components/activity/activity.module';
import { AuthGuard } from './components/auth/auth.guard';
import { AuthModule } from './components/auth/auth.module';
import { CategoryModule } from './components/category/category.module';
import { HeadOfficeModule } from './components/headOffice/headOffice.module';
import { OrderModule } from './components/order/order.module';
import { ProductModule } from './components/product/product.module';
import { UserModule } from './components/user/user.module';
import { GlobalErrorFilter } from './filters/global-error.filter';

@Module({
  imports: [
    ConfigModule.forRoot(configModuleOptions),
    AuthModule,
    UserModule,
    ActivityModule,
    HeadOfficeModule,
    CategoryModule,
    ProductModule,
    OrderModule,
  ],
  providers: [
    { provide: APP_GUARD, useClass: AuthGuard },
    { provide: APP_FILTER, useClass: GlobalErrorFilter },
  ],
})
export class AppModule {}
