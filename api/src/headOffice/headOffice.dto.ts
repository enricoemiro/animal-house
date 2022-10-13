import { PickType } from '@nestjs/mapped-types';
import { IsString } from 'class-validator';
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
}

export class HeadOfficeLocationDto extends PickType(HeadOfficeDto, [
  'location',
] as const) {}

export class HeadOfficeUpdateDto extends PickType(HeadOfficeDto, [
  'location',
  'phone',
  'openingTime',
  'closingTime',
] as const) {
  @IsString()
  id: string;
}
