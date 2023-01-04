import { UnauthorizedException } from '@nestjs/common';

export class BlockedUserException extends UnauthorizedException {
  constructor() {
    super('You are not authorized to access the system because your account has been disabled.');
  }
}
