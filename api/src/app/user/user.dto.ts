import { Gender } from '@prisma/client';
import { IsDateString, IsEmail, IsEnum, IsMongoId, IsOptional, Length } from 'class-validator';

export class UserDTO {
  @IsMongoId()
  id: string;

  @Length(1, 128)
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
