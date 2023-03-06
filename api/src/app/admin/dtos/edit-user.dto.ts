import { PickType } from '@nestjs/mapped-types';

import { UserDTO } from '@/app/user/user.dto';

export class EditUserDTO extends PickType(UserDTO, [
  'name',
  'email',
  'gender',
  'dateOfBirth',
  'role',
] as const) {}
