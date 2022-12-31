import { Module } from '@nestjs/common';

import { PrismaService } from '@/config/prisma/prisma';

import { UserService } from './user.service';

@Module({
  providers: [PrismaService, UserService],
  exports: [UserService],
})
export class UserModule {}
