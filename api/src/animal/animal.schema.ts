import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

import { User } from '@app/user/user.schema';

export type AnimalDocument = Animal & Document;

export enum Size {
  XS = 'xs',
  S = 's',
  M = 'm',
  L = 'l',
  XL = 'xl',
}

@Schema({ autoCreate: true })
export class Animal {
  @Prop({
    type: String,
    required: true,
    unique: false,
  })
  name: string;

  @Prop({
    type: String,
    required: true,
    unique: false,
  })
  species: string;

  @Prop({
    type: String,
    required: true,
    unique: false,
  })
  race: string;

  @Prop({
    type: String,
    enum: Size,
    required: false,
  })
  size: Size;

  @Prop({
    type: Date,
    required: false,
  })
  dateOfBirth: Date;

  @Prop({
    type: Boolean,
    default: false,
    required: false,
  })
  microchip: boolean;

  @Prop({
    type: Types.ObjectId,
    ref: 'User',
    required: true,
  })
  ownerId: User;
}

export const AnimalSchema = SchemaFactory.createForClass(Animal);
