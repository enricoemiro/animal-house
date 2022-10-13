import { HttpStatus } from '@nestjs/common';

import { I18nHttpException } from '@app/i18n/i18n.interface';

export class AclGuardException extends I18nHttpException {
  public constructor() {
    super({
      key: 'exception.forbidden',
      status: HttpStatus.FORBIDDEN,
    });
  }
}
