import { PickType } from '@nestjs/mapped-types';
import { IsMongoId } from 'class-validator';

import { HeadOfficeDTO } from '../headOffice.dto';

export class UpdateActivitiesDTO extends PickType(HeadOfficeDTO, ['id'] as const) {
  @IsMongoId({ each: true })
  activityIDs: string[];
}
