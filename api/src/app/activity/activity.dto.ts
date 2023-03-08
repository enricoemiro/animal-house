import { Mode } from '@prisma/client';
import { Transform } from 'class-transformer';
import { IsDateString, IsEnum, IsInt, IsMongoId, IsString } from 'class-validator';
import xss from 'xss';

export class ActivityDTO {
  @IsMongoId()
  id: string;

  @IsString()
  @Transform(({ value }) => xss(value))
  name: string;

  @IsString()
  @Transform(({ value }) => xss(value))
  description: string;

  @IsDateString({ strict: true, strictSeparator: true })
  dateOfPerformance: Date;

  @IsEnum(Mode)
  mode: Mode;

  @IsInt()
  availability: number;

  @IsMongoId()
  headOfficeId: string;
}
