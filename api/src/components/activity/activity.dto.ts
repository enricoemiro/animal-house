import { Mode } from '@prisma/client';
import { IsDateString, IsEnum, IsInt, IsMongoId, IsString } from 'class-validator';

export class ActivityDTO {
  @IsMongoId()
  id: string;

  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsDateString()
  dateOfPerformance: string;

  @IsEnum(Mode)
  mode: Mode;

  @IsInt()
  availability: number;

  @IsMongoId()
  headOfficeId: string;
}
