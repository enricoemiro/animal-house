import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { HasherModule } from '@app/hasher/hasher.module';
import { HasherService } from '@app/hasher/hasher.service';
import { PaginateModule } from '@app/paginate/paginate.module';
import { PermissionModule } from '@app/permission/permission.module';
import { SessionModule } from '@app/session/session.module';
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

            this.password = await hasherService.hash(this.password);
          });

          schema.pre<any>(
            'insertMany',
            async function (_next: any, users: UserDocument[]) {
              await Promise.all(
                users.map(async function (user) {
                  user.password = await hasherService.hash(user.password);
                }),
              );
            },
          );

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
    PermissionModule,
    HasherModule,
    SessionModule,
    PaginateModule,
  ],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
