import { OmitType } from '@nestjs/mapped-types';

import { UserDTO } from '@/app/user/user.dto';
import { IsEqualTo } from '@/common/decorators/is-equal-to.decorator';

export class RegisterDTO extends OmitType(UserDTO, ['id', 'vip'] as const) {
  @IsEqualTo('password')
  passwordConfirmation: string;
}
