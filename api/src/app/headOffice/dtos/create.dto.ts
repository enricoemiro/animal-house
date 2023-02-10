import { PickType } from '@nestjs/mapped-types';

import { HeadOfficeDTO } from '../headOffice.dto';

export class CreateDTO extends PickType(HeadOfficeDTO, [
  'location',
  'streetAddress',
  'coordinates',
] as const) {}
