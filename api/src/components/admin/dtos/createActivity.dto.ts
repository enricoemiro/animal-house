import { PickType } from '@nestjs/mapped-types';

import { ActivityDTO } from '@/components/activity/activity.dto';

export class CreateActivityDTO extends PickType(ActivityDTO, [
  'name',
  'description',
  'dateOfPerformance',
  'mode',
  'availability',
  'headOfficeId'
] as const) {}
