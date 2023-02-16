import { Module } from '@nestjs/common';

import { PrismaModule } from '@/config/prisma/prisma.module';

import { AnimalService } from './animal.service';

@Module({
  imports: [PrismaModule],
  providers: [AnimalService],
  exports: [AnimalService],
})
export class AnimalModule {}
