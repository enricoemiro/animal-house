import { IntersectionType, PickType } from '@nestjs/mapped-types';

import { TokenDto } from '@app/token/token.dto';
import { UserDto } from '@app/user/user.dto';

export class RegisterUserDto extends PickType(UserDto, [
  'name',
  'email',
  'password',
  'confirmPassword',
  'gender',
  'address',
  'dateOfBirth',
] as const) {}

export class ActivateUserAccountDto extends IntersectionType(
  PickType(UserDto, ['email'] as const),
  PickType(TokenDto, ['token'] as const),
) {}

export class ForgotPasswordDto extends PickType(UserDto, ['email'] as const) {}

export class ResetPasswordDto extends IntersectionType(
  PickType(UserDto, ['email', 'password', 'confirmPassword'] as const),
  PickType(TokenDto, ['token'] as const),
) {}

export class LoginDto extends PickType(UserDto, [
  'email',
  'password',
] as const) {}
