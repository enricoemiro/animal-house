import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

import { Permission } from '@app/permission/permission.schema';

export type UserDocument = User & Document;

export enum Gender {
  MALE = 'male',
  FEMALE = 'female',
  OTHER = 'other',
}

@Schema({ timestamps: true, autoCreate: true })
export class User {
  @Prop({
    type: String,
    required: true,
  })
  name: string;

  @Prop({
    type: String,
    unique: true,
    required: true,
  })
  email: string;

  @Prop({
    type: String,
    required: true,
  })
  password: string;

  @Prop({
    type: String,
    enum: Gender,
  })
  gender: Gender;

  @Prop({ type: Date })
  dateOfBirth: Date;

  @Prop({ type: String })
  address: string;

  @Prop({
    type: Boolean,
    default: false,
  })
  isActive: boolean;

  @Prop({
    type: Boolean,
    default: false,
  })
  isBlocked: boolean;

  @Prop({
    type: [{ type: Types.ObjectId, ref: 'Permission' }],
    unique: false,
  })
  permissions: Permission[];
}

export const UserSchema = SchemaFactory.createForClass(User);
