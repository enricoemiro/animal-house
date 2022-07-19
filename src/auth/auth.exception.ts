import { NotFoundException } from '@nestjs/common';

export class AuthGuardException extends NotFoundException {
  public constructor() {
    super('exception.notFound');
  }
}
