import { Module } from '@nestjs/common';

import { PrismaModule } from '@/config/prisma/prisma.module';

import { HeadOfficeController } from './headOffice.controller';
import { HeadOfficeService } from './headOffice.service';

@Module({
  imports: [PrismaModule],
  controllers: [HeadOfficeController],
  providers: [HeadOfficeService],
  exports: [HeadOfficeService],
})
export class HeadOfficeModule {}
