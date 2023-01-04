import { PickType } from '@nestjs/mapped-types';

import { UserDTO } from '../user.dto';

export class UpdateProfileDTO extends PickType(UserDTO, [
  'name',
  'email',
  'gender',
  'dateOfBirth',
] as const) {}
