import { PickType } from '@nestjs/mapped-types';

import { UserDTO } from '@/components/user/user.dto';

export class CreateUserDTO extends PickType(UserDTO, [
  'name',
  'email',
  'password',
  'gender',
  'dateOfBirth',
  'role',
] as const) {}