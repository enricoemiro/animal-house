import { UnauthorizedException } from '@nestjs/common';

export class AuthException extends UnauthorizedException {
  constructor() {
    super(
      'This resource is only available to users who are logged in. If you are already logged in, please log out and try again.',
    );
  }
}
