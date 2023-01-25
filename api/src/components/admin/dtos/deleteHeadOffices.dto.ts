import { PartialType } from '@nestjs/mapped-types';
import { IsMongoId } from 'class-validator';

import { HeadOfficeDTO } from '@/components/headOffice/headOffice.dto';

export class DeleteHeadOfficesDTO extends PartialType(HeadOfficeDTO) {
  @IsMongoId({ each: true })
  headOfficeIDs: string[];
}