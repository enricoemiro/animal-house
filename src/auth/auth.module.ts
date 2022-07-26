import { Module } from '@nestjs/common';

import { HasherModule } from '@app/hasher/hasher.module';
import { SessionModule } from '@app/session/session.module';
import { TokenModule } from '@app/token/token.module';
import { UserModule } from '@app/user/user.module';

import { AuthController } from './auth.controller';

@Module({
  imports: [TokenModule, UserModule, HasherModule, SessionModule],
  controllers: [AuthController],
  exports: [SessionModule],
})
export class AuthModule {}
