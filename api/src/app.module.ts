import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MulterModule } from '@nestjs/platform-express';

import { ActivityModule } from './app/activity/activity.module';
import { AuthModule } from './app/auth/auth.module';
import { HeadOfficeModule } from './app/headOffice/headOffice.module';
import { PostModule } from './app/post/post.module';
import { UserModule } from './app/user/user.module';
import { configModuleOptions } from './config/env.config';
import { multerModuleOptions } from './config/multer.config';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot(configModuleOptions),
    MulterModule.registerAsync(multerModuleOptions),
    AuthModule,
    UserModule,
    PostModule,
    UserModule,
    HeadOfficeModule,
    ActivityModule,
  ],
  exports: [MulterModule],
})
export class AppModule {}
