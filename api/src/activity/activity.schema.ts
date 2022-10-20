import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

import { HeadOffice } from '@app/headOffice/headOffice.schema';
import { User } from '@app/user/user.schema';

export type ActivityDocument = Activity & Document;

export enum Mode {
  ONLINE = 'online',
  IN_PRESENCE = 'in_presence',
}

@Schema({ autoCreate: true })
export class Activity {
  @Prop({
    type: String,
    required: true,
  })
  name: string;

  @Prop({
    type: String,
    enum: Mode,
    required: true,
  })
  mode: Mode;

  @Prop({
    type: String,
    required: true,
  })
  description: string;

  @Prop({
    type: Number,
    required: true,
  })
  price: number;

  @Prop({
    type: Date,
    required: true,
  })
  dateOfPerformance: Date;

  @Prop({
    type: Types.ObjectId,
    ref: 'User',
  })
  ownerId: User;

  @Prop({
    type: Types.ObjectId,
    ref: 'HeadOffice',
  })
  headOfficeId: HeadOffice;
}

export const ActivitySchema = SchemaFactory.createForClass(Activity);
