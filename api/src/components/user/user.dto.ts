import { Gender, Role } from '@prisma/client';
import { Transform } from 'class-transformer';
import {
  IsDateString,
  IsEmail,
  IsEnum,
  IsMongoId,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UserDTO {
  @IsMongoId()
  id: string;

  // Regular expression to check if a field contains only letters from any alphabet and diacritics
  // (e.g. è, à, ò)
  @Matches(/^[\p{L}\p{M}]+$/u)
  @MaxLength(128)
  @MinLength(1)
  name: string;

  @IsEmail()
  email: string;

  @MaxLength(64)
  password: string;

  @Transform(({ value }) => value.toUpperCase())
  @IsEnum(Gender)
  gender: Gender;

  @IsDateString({ strict: true })
  dateOfBirth: string;

  @Transform(({ value }) => value.toUpperCase())
  @IsEnum(Role)
  role: Role;
}
