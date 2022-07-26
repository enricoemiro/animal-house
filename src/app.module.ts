import { MailerModule } from '@enricoemiro/mailer';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { WinstonModule } from 'nest-winston';
import { I18nModule } from 'nestjs-i18n';

import { AclGuard } from '@app/acl/acl.guard';
import { AuthGuard } from '@app/auth/auth.guard';
import { AuthModule } from '@app/auth/auth.module';
import { configModuleOptions } from '@app/config/env.config';
import { i18nModuleOptions } from '@app/config/i18n.config';
import { MailerConfigService } from '@app/config/mailer.config';
import { MongooseConfigService } from '@app/config/mongoose.config';
import { ThrottlerConfigService } from '@app/config/throttler.config';
import { WinstonConfigService } from '@app/config/winston.config';
import { DevModule } from '@app/dev/dev.module';
import { PermissionModule } from '@app/permission/permission.module';
import { UserModule } from '@app/user/user.module';
import { AllExceptionsFilter } from '@app/utils/filters/allExceptions.filters';

@Module({
  imports: [
    ConfigModule.forRoot(configModuleOptions),
    I18nModule.forRoot(i18nModuleOptions),
    WinstonModule.forRootAsync({
      useClass: WinstonConfigService,
    }),
    MailerModule.forRootAsync({
      useClass: MailerConfigService,
      inject: [ConfigService],
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      useClass: MongooseConfigService,
      inject: [ConfigService],
    }),
    ThrottlerModule.forRootAsync({
      useClass: ThrottlerConfigService,
      inject: [ConfigService],
    }),
    AuthModule,
    UserModule,
    PermissionModule,
    DevModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: AclGuard,
    },
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
  ],
})
export class AppModule {}
