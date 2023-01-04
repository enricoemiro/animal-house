import { Module } from '@nestjs/common';

import { PrismaService } from '@/config/prisma/prisma';

import { HeadOfficeController } from './headOffice.controller';
import { HeadOfficeService } from './headOffice.service';

@Module({
  controllers: [HeadOfficeController],
  providers: [PrismaService, HeadOfficeService],
  exports: [HeadOfficeService],
})
export class HeadOfficeModule {}
