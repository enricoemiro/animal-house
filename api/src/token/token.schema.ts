import * as crypto from 'node:crypto';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

import { User } from '@app/user/user.schema';

export type TokenDocument = Token & Document;

// Values are in minutes.
export const TokenMap: Map<string, number> = new Map([
  ['auth_activation', 60],
  ['auth_forgot_password', 15],
]);

@Schema({ timestamps: true, autoCreate: true })
export class Token {
  @Prop({
    type: String,
    required: true,
    enum: [...TokenMap.keys()],
    immutable: true,
  })
  name: string;

  @Prop({
    type: String,
    required: true,
    unique: true,
    default: crypto.randomUUID,
  })
  uuid: string;

  @Prop({
    type: Types.ObjectId,
    required: true,
    ref: User.name,
    immutable: true,
  })
  ownerId: Types.ObjectId;

  @Prop({
    type: Date,
    required: true,
    expires: 0,
    default: Date.now,
  })
  expiresAt: Date;
}

export const TokenSchema = SchemaFactory.createForClass(Token);
