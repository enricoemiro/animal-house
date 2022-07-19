import { PickType } from '@nestjs/mapped-types';

import { UserDto } from '@app/user/user.dto';

export class DevCreateAdminDto extends PickType(UserDto, [
  'name',
  'email',
  'password',
] as const) {}
