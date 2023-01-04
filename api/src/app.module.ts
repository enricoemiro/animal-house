import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';

import { configModuleOptions } from '@/config/env';

import { ACLGuard } from './components/acl/acl.guard';
import { AuthGuard } from './components/auth/auth.guard';
import { AuthModule } from './components/auth/auth.module';
import { PermissionModule } from './components/permission/permission.module';
import { UserModule } from './components/user/user.module';
import { GlobalErrorFilter } from './filters/global-error.filter';

@Module({
  imports: [ConfigModule.forRoot(configModuleOptions), AuthModule, UserModule, PermissionModule],
  providers: [
    { provide: APP_GUARD, useClass: AuthGuard },
    { provide: APP_GUARD, useClass: ACLGuard },
    { provide: APP_FILTER, useClass: GlobalErrorFilter },
  ],
})
export class AppModule {}
