import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { UserModule } from '@app/user/user.module';

import { PermissionController } from './permission.controller';
import { Permission, PermissionSchema } from './permission.schema';
import { PermissionService } from './permission.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Permission.name,
        schema: PermissionSchema,
      },
    ]),
    forwardRef(() => UserModule),
  ],
  providers: [PermissionService],
  controllers: [PermissionController],
  exports: [PermissionService],
})
export class PermissionModule {}
