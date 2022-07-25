import { BadRequestException, NotFoundException } from '@nestjs/common';

export class AuthGuardException extends NotFoundException {
  public constructor() {
    super('exception.notFound');
  }
}

export class AuthGuardNotOnSelfException extends BadRequestException {
  public constructor() {
    super('auth.exception.notOnSelf');
  }
}
