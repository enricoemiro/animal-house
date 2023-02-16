import { Module } from '@nestjs/common';

import { AnimalModule } from '@/app/animal/animal.module';
import { HasherModule } from '@/app/hasher/hasher.module';
import { PrismaModule } from '@/config/prisma/prisma.module';

import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [PrismaModule, HasherModule, AnimalModule],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
