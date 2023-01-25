import { PickType } from '@nestjs/mapped-types';

import { HeadOfficeDTO } from '@/components/headOffice/headOffice.dto';

export class CreateHeadOfficeDTO extends PickType(HeadOfficeDTO, [
  'location',
  'streetAddress',
  'coordinates',
] as const) {}
