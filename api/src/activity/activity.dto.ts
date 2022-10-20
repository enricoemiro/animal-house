import { PartialType } from '@nestjs/mapped-types';
import {
  IsDateString,
  IsEnum,
  IsMongoId,
  IsNumber,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Types } from 'mongoose';
import { i18nValidationMessage as t } from 'nestjs-i18n';

import { Mode } from './activity.schema';

export class ActivityDto {
  @IsString({ message: t('validation.string.isString') })
  @MaxLength(128, { message: t('validation.string.maxLength') })
  @MinLength(1, { message: t('validation.string.minLength') })
  name: string;

  @IsEnum(Mode, {
    message: t('validation.string.enum', {
      values: [...Object.values(Mode)].join(', '),
    }),
  })
  mode: Mode;

  @IsString({ message: t('validation.string.isString') })
  description: string;

  @IsNumber({}, { message: t('validation.number.isNumber') })
  price: number;

  @IsDateString({}, { message: t('validation.string.dateString') })
  dateOfPerformance: Date;

  @IsMongoId({
    message: t('validation.string.mongoId'),
  })
  ownerId: Types.ObjectId;

  @IsMongoId({
    message: t('validation.string.mongoId'),
  })
  headOfficeId: Types.ObjectId;
}

export class ActivityDeleteDto extends PartialType(ActivityDto) {
  @IsMongoId({
    message: t('validation.string.mongoId'),
  })
  id: Types.ObjectId;
}

export class ActivityUpdateDto extends PartialType(ActivityDto) {
  @IsMongoId({
    message: t('validation.string.mongoId'),
  })
  id: Types.ObjectId;
}
