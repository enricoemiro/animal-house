import { HttpStatus } from '@nestjs/common';

import { I18nHttpException } from '@app/i18n/i18n.interface';

export class AuthGuardException extends I18nHttpException {
  public constructor() {
    super({
      key: 'exception.notFound',
      status: HttpStatus.NOT_FOUND,
    });
  }
}

export class AuthGuardNotOnSelfException extends I18nHttpException {
  public constructor() {
    super({
      key: 'auth.exception.notOnSelf',
      status: HttpStatus.BAD_REQUEST,
    });
  }
}
