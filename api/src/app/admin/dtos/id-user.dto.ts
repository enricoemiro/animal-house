import { PickType } from '@nestjs/mapped-types';

import { UserDTO } from '@/app/user/user.dto';

export class IdUserDTO extends PickType(UserDTO, ['id'] as const) {}
