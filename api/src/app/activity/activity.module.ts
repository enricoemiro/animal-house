import { Module } from '@nestjs/common';

import { PrismaModule } from '@/config/prisma/prisma.module';

import { ActivityController } from './activity.controller';
import { ActivityService } from './activity.service';

@Module({
  imports: [PrismaModule],
  controllers: [ActivityController],
  providers: [ActivityService],
})
export class ActivityModule {}
