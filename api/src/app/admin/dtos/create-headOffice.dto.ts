import { PickType } from '@nestjs/mapped-types';

import { HeadOfficeDTO } from '@/app/headOffice/headOffice.dto';

export class CreateHeadOfficeDTO extends PickType(HeadOfficeDTO, [
  'location',
  'streetAddress',
  'coordinates',
] as const) {}
