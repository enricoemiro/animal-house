import { HttpStatus } from '@nestjs/common';

import { I18nHttpException } from '@app/i18n/i18n.interface';

export class TokenCouldNotBeCreatedException extends I18nHttpException {
  public constructor() {
    super({
      key: 'token.exception.couldNotBeCreated',
      status: HttpStatus.BAD_REQUEST,
    });
  }
}

export class TokenNotFoundException extends I18nHttpException {
  public constructor() {
    super({
      key: 'token.exception.notFound',
      status: HttpStatus.BAD_REQUEST,
    });
  }
}
