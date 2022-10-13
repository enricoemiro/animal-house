import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { addTimeToDate } from '@app/utils/helpers';

import { Token, TokenDocument, TokenMap, TokenSchema } from './token.schema';
import { TokenService } from './token.service';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: Token.name,
        useFactory: () => {
          const schema = TokenSchema;
          schema.pre<TokenDocument>('save', function () {
            if (!this.isNew && !this.isModified('expiresAt')) return;

            // Set TTL index based on the TokenMap
            this.expiresAt = addTimeToDate(
              this.expiresAt,
              TokenMap.get(this.name),
            );
          });
          return schema;
        },
      },
    ]),
  ],
  providers: [TokenService],
  exports: [TokenService],
})
export class TokenModule {}
