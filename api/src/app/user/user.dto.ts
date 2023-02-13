import { Gender } from '@prisma/client';
import { Transform } from 'class-transformer';
import { IsDateString, IsEmail, IsEnum, IsMongoId, IsOptional, Length } from 'class-validator';
import xss from 'xss';

export class UserDTO {
  @IsMongoId()
  id: string;

  @Length(1, 128)
  @Transform(({ value }) => xss(value))
  name: string;

  @IsEmail()
  email: string;

  @Length(8, 64)
  password: string;

  @IsEnum(Gender)
  @IsOptional()
  gender?: Gender;

  @IsDateString({ strict: true })
  @IsOptional()
  dateOfBirth?: string;
}
