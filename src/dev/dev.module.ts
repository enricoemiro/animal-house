import { Module } from '@nestjs/common';

import { PermissionModule } from '@app/permission/permission.module';
import { UserModule } from '@app/user/user.module';

import { DevController } from './dev.controller';

@Module({
  imports: [PermissionModule, UserModule],
  controllers: [DevController],
})
export class DevModule {}
