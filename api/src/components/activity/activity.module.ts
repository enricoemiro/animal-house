import { Module } from '@nestjs/common';

import { PrismaService } from '@/config/prisma/prisma';

import { ActivityController } from './activity.controller';
import { ActivityService } from './activity.service';

@Module({
  controllers: [ActivityController],
  providers: [PrismaService, ActivityService],
  exports: [ActivityService],
})
export class ActivityModule {}
