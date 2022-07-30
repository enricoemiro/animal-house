import { OmitType, PartialType, PickType } from '@nestjs/mapped-types';
import { IsMongoId, IsString } from 'class-validator';
import { Types } from 'mongoose';
import { i18nValidationMessage as t } from 'nestjs-i18n';

export class HeadOfficeDto {
  @IsString({ message: t('validation.string.isString') })
  location: string;

  @IsString({ message: t('validation.string.isString') })
  phone: string;

  @IsString({ message: t('validation.string.isString') })
  openingTime: string;

  @IsString({ message: t('validation.string.isString') })
  closingTime: string;

  @IsMongoId({
    each: true,
    message: t('validation.string.mongoId'),
  })
  activities: string[];
}

export class HeadOfficeCreateDto extends OmitType(HeadOfficeDto, [
  'activities',
] as const) {}

export class HeadOfficeUpdateDto extends OmitType(PartialType(HeadOfficeDto), [
  'activities',
] as const) {
  @IsMongoId({ message: t('validation.string.mongoId') })
  id: Types.ObjectId;
}

export class HeadOfficeUpdateServiceDto extends PartialType(HeadOfficeDto) {
  @IsMongoId({ message: t('validation.string.mongoId') })
  id: Types.ObjectId;
}

export class HeadOfficeDeleteDto extends PickType(HeadOfficeDto, [
  'location',
] as const) {}
