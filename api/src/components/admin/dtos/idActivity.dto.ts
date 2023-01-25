import { PickType } from '@nestjs/mapped-types';

import { ActivityDTO } from '@/components/activity/activity.dto';

export class IdActivityDTO extends PickType(ActivityDTO, [
  'id',
] as const) {}