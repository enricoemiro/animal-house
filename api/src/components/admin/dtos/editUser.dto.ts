import { PickType } from '@nestjs/mapped-types';

import { UserDTO } from '@/components/user/user.dto';

export class EditUserDTO extends PickType(UserDTO, [
  'name',
  'email',
  'gender',
  'dateOfBirth',
  'role',
] as const) {}