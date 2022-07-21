import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

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
}

export const HeadOfficeSchema = SchemaFactory.createForClass(HeadOffice);
