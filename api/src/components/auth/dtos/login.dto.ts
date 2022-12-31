import { PickType } from '@nestjs/mapped-types';

import { UserDTO } from '@/components/user/user.dto';

export class LoginDTO extends PickType(UserDTO, ['email', 'password'] as const) {}
