import { Module } from '@nestjs/common';

import { PrismaService } from '@/config/prisma/prisma';

import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  controllers: [UserController],
  providers: [PrismaService, UserService],
  exports: [UserService],
})
export class UserModule {}
