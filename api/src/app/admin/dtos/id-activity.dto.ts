import { PickType } from '@nestjs/mapped-types';

import { ActivityDTO } from '@/app/activity/activity.dto';

export class IdActivityDTO extends PickType(ActivityDTO, ['id'] as const) {}
