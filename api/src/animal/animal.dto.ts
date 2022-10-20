import { PartialType, PickType } from '@nestjs/mapped-types';
import {
  IsBoolean,
  IsDateString,
  IsEnum,
  IsMongoId,
  IsString,
} from 'class-validator';
import { Types } from 'mongoose';
import { i18nValidationMessage as t } from 'nestjs-i18n';

import { Size } from './animal.schema';

export class AnimalDto {
  @IsString({ message: t('validation.string.isString') })
  name: string;

  @IsString({ message: t('validation.string.isString') })
  species: string;

  @IsString({ message: t('validation.string.isString') })
  race: string;

  @IsEnum(Size, {
    message: t('validation.string.enum', {
      values: [...Object.values(Size)].join(', '),
    }),
  })
  size: Size;

  @IsDateString({}, { message: t('validation.string.dateString') })
  dateOfBirth: Date;

  @IsBoolean({ message: t('validation.boolean.isBoolean') })
  microchip: boolean;

  @IsMongoId({
    message: t('valiation.string.mongoId'),
  })
  ownerId: Types.ObjectId;
}

export class AnimalCreateDto extends PickType(AnimalDto, [
  'name',
  'species',
  'race',
  'ownerId',
] as const) {}

export class AnimalUpdateDto extends PartialType(AnimalDto) {
  @IsMongoId({ message: t('validation.string.mongoId') })
  id: Types.ObjectId;
}
