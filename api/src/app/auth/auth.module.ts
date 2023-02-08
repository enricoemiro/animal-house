import { Module } from '@nestjs/common';

import { HasherModule } from '@/app/hasher/hasher.module';
import { UserModule } from '@/app/user/user.module';

import { AuthController } from './auth.controller';

@Module({
  imports: [UserModule, HasherModule],
  controllers: [AuthController],
})
export class AuthModule {}
