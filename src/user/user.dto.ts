import {
  IntersectionType,
  OmitType,
  PartialType,
  PickType,
} from '@nestjs/mapped-types';
import {
  IsDateString,
  IsEmail,
  IsEnum,
  IsMongoId,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Matches } from 'class-validator-matches';
import { i18nValidationMessage as t } from 'nestjs-i18n';

import { PermissionDto } from '@app/permission/permission.dto';

import { Gender } from './user.schema';

export class UserDto {
  @MaxLength(128, { message: t('validation.string.maxLength') })
  @MinLength(1, { message: t('validation.string.minLength') })
  name: string;

  @IsEmail({}, { message: t('validation.string.email') })
  email: string;

  @MaxLength(64, { message: t('validation.string.maxLength') })
  @MinLength(8, { message: t('validation.string.minLength') })
  password: string;

  @Matches('password', { message: t('user.dto.passwordMatch') })
  confirmPassword: string;

  @IsEnum(Gender, {
    message: t('validation.string.enum', {
      values: [...Object.values(Gender)].join(', '),
    }),
  })
  gender: Gender;

  @MaxLength(128, { message: t('validation.string.maxLength') })
  @MinLength(1, { message: t('validation.string.minLength') })
  address: string;

  @IsDateString({}, { message: t('validation.string.dateString') })
  dateOfBirth: Date;

  @IsMongoId({
    each: true,
    message: t('validation.string.mongoId'),
  })
  permissions: string[];
}

export class UserUpdateAccountDto extends OmitType(PartialType(UserDto), [
  'password',
  'confirmPassword',
  'permissions',
] as const) {}

export class UserUpdatePasswordDto extends PickType(UserDto, [
  'password',
  'confirmPassword',
] as const) {
  @MaxLength(64, { message: t('validation.string.maxLength') })
  @MinLength(8, { message: t('validation.string.minLength') })
  newPassword: string;
}

export class UserPermissionsDto extends IntersectionType(
  PickType(UserDto, ['email'] as const),
  PickType(PermissionDto, ['names'] as const),
) {}
