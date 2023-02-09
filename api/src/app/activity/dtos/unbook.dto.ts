import { IntersectionType, PickType } from '@nestjs/mapped-types';

import { ActivityDTO } from '../activity.dto';

export class UnbookDTO extends IntersectionType(PickType(ActivityDTO, ['id'] as const)) {}
