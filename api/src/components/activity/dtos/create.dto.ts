import { PickType } from '@nestjs/mapped-types';

import { ActivityDTO } from '../activity.dto';

export class CreateDTO extends PickType(ActivityDTO, [
  'name',
  'description',
  'dateOfPerformance',
  'mode',
  'availability',
] as const) {}
