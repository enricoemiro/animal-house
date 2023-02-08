import { UnauthorizedException } from '@nestjs/common';

export class AuthException extends UnauthorizedException {
  constructor() {
    super(
      'This resource is only available to users who are logged in. If you are not logged in, please log in and try again.',
    );
  }
}
