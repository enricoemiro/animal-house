import { Module } from '@nestjs/common';

import { HasherModule } from '@/app/hasher/hasher.module';
import { PrismaModule } from '@/config/prisma/prisma.module';

import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [PrismaModule, HasherModule],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
