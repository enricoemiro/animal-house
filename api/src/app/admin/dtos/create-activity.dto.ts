import { PickType } from '@nestjs/mapped-types';

import { ActivityDTO } from '@/app/activity/activity.dto';

export class CreateActivityDTO extends PickType(ActivityDTO, [
  'name',
  'description',
  'dateOfPerformance',
  'mode',
  'availability',
  'headOfficeId',
] as const) {}
