import { PickType } from '@nestjs/mapped-types';

import { UserDTO } from '@/components/user/user.dto';

export class IdUserDTO extends PickType(UserDTO, [
  'id',
] as const) {}