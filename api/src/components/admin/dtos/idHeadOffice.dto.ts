import { PickType } from '@nestjs/mapped-types';

import { HeadOfficeDTO } from '@/components/headOffice/headOffice.dto';

export class IdHeadOfficeDTO extends PickType(HeadOfficeDTO, [
  'id',
] as const) {}