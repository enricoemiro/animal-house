import { PickType } from '@nestjs/mapped-types';

import { HeadOfficeDTO } from '../headOffice.dto';

export class GetActivitiesByHeadOfficeIdDTO extends PickType(HeadOfficeDTO, ['id'] as const) {}
