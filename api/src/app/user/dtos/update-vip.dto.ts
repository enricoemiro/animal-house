import { PickType } from '@nestjs/mapped-types';

import { UserDTO } from '../user.dto';

export class UpdateVipDTO extends PickType(UserDTO, ['vip'] as const) {}
