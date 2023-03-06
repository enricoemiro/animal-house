import { PickType } from '@nestjs/mapped-types';

import { UserDTO } from '@/app/user/user.dto';

export class CreateUserDTO extends PickType(UserDTO, [
  'name',
  'email',
  'password',
  'gender',
  'dateOfBirth',
  'role',
] as const) {}
