import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { PaginateModule } from '@app/paginate/paginate.module';
import { PermissionModule } from '@app/permission/permission.module';
import { SessionModule } from '@app/session/session.module';
import { UserModule } from '@app/user/user.module';

import { HeadOfficeController } from './headOffice.controller';
import { HeadOffice, HeadOfficeSchema } from './headOffice.schema';
import { HeadOfficeService } from './headOffice.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: HeadOffice.name,
        schema: HeadOfficeSchema,
      },
    ]),
    UserModule,
    PermissionModule,
    SessionModule,
    PaginateModule,
  ],
  controllers: [HeadOfficeController],
  providers: [HeadOfficeService],
  exports: [HeadOfficeService],
})
export class HeadOfficeModule {}
