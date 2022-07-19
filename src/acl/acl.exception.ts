import { ForbiddenException } from '@nestjs/common';

export class AclGuardException extends ForbiddenException {
  public constructor() {
    super('exception.forbidden');
  }
}
