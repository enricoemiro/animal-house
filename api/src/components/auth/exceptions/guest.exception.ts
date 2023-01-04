import { UnauthorizedException } from '@nestjs/common';

export class GuestException extends UnauthorizedException {
  constructor() {
    super(
      'This resource is only available to users who are not logged in. If you are already logged in, please log out and try again.',
    );
  }
}
