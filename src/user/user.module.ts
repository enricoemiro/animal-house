import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { HasherModule } from '@app/hasher/hasher.module';
import { HasherService } from '@app/hasher/hasher.service';
import { PermissionModule } from '@app/permission/permission.module';
import { TokenModule } from '@app/token/token.module';
import { TokenService } from '@app/token/token.service';

import { UserController } from './user.controller';
import { User, UserDocument, UserSchema } from './user.schema';
import { UserService } from './user.service';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: User.name,
        useFactory: (
          hasherService: HasherService,
          tokenService: TokenService,
        ) => {
          const schema = UserSchema;

          schema.pre<UserDocument>('save', async function () {
            if (!this.isModified('password')) return;

            const hashedPassword = await hasherService.hash(this.password);

            this.password = hashedPassword;
          });

          schema.pre<any>('deleteOne', async function () {
            const userId = this._conditions._id;

            await tokenService.deleteByOwnerId(userId);
          });

          return schema;
        },
        inject: [HasherService, TokenService],
        imports: [HasherModule, TokenModule],
      },
    ]),
    forwardRef(() => PermissionModule),
  ],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
