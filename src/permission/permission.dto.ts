import {
  ArrayMaxSize,
  ArrayMinSize,
  ArrayUnique,
  IsArray,
  IsEnum,
} from 'class-validator';
import { i18nValidationMessage as t } from 'nestjs-i18n';

import { PermissionName } from './permission.schema';

export class PermissionDto {
  @IsEnum(PermissionName, { each: true, message: t('permission.enum') })
  @ArrayMaxSize(Object.keys(PermissionName).length, {
    message: t('validation.array.maxSize'),
  })
  @ArrayMinSize(1, { message: t('validation.array.minSize') })
  @ArrayUnique({ message: t('validation.array.unique') })
  @IsArray({ message: t('validation.array.type') })
  names: PermissionName[];
}
