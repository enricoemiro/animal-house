import { OmitType } from '@nestjs/mapped-types';

import { UserDTO } from '@/components/user/user.dto';
import { IsEqualTo } from '@/helpers/decorators/is-equal-to.decorator';

export class RegisterDTO extends OmitType(UserDTO, ['id', 'permissions'] as const) {
  @IsEqualTo('password')
  passwordConfirmation: string;
}
