import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Activity, ActivitySchema } from '@app/activity/activity.schema';
import { HeadOfficeModule } from '@app/headOffice/headOffice.module';
import { PaginateModule } from '@app/paginate/paginate.module';
import { UserModule } from '@app/user/user.module';

import { ActivityController } from './activity.controller';
import { ActivityService } from './activity.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Activity.name,
        schema: ActivitySchema,
      },
    ]),
    PaginateModule,
    UserModule,
    HeadOfficeModule,
  ],
  controllers: [ActivityController],
  providers: [ActivityService],
  exports: [ActivityService],
})
export class ActivityModule {}
