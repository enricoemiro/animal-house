import { HttpStatus } from '@nestjs/common';

import { I18nHttpException } from '@app/i18n/i18n.interface';

export class PermissionsNotFoundException extends I18nHttpException {
  public constructor() {
    super({
      key: 'permission.exception.notFound',
      status: HttpStatus.BAD_REQUEST,
    });
  }
}
