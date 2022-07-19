import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { HasherModule } from '@app/hasher/hasher.module';
import { HasherService } from '@app/hasher/hasher.service';
import { PermissionModule } from '@app/permission/permission.module';

import { UserController } from './user.controller';
import { User, UserDocument, UserSchema } from './user.schema';
import { UserService } from './user.service';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: User.name,
        useFactory: (hasherService: HasherService) => {
          const schema = UserSchema;
          schema.pre<UserDocument>('save', async function () {
            if (!this.isModified('password')) return;

            const hashedPassword = await hasherService.hash(this.password);

            this.password = hashedPassword;
          });
          return schema;
        },
        inject: [HasherService],
        imports: [HasherModule],
      },
    ]),
    forwardRef(() => PermissionModule),
  ],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
