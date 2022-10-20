import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

import { Activity } from '@app/activity/activity.schema';

export type HeadOfficeDocument = HeadOffice & Document;

@Schema({ autoCreate: true })
export class HeadOffice {
  @Prop({
    type: String,
    required: true,
    unique: true,
  })
  location: string;

  @Prop({
    type: String,
    required: true,
    unique: true,
  })
  phone: string;

  @Prop({
    type: String,
    required: true,
  })
  openingTime: string;

  @Prop({
    type: String,
    required: true,
  })
  closingTime: string;

  @Prop({
    type: [{ type: Types.ObjectId, ref: 'Activity' }],
    unique: false,
  })
  activities: Activity[];
}

export const HeadOfficeSchema = SchemaFactory.createForClass(HeadOffice);
