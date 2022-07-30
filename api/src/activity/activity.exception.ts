import { HttpStatus } from '@nestjs/common';

import { I18nHttpException } from '@app/i18n/i18n.interface';

export class ActivityNotFoundException extends I18nHttpException {
  public constructor() {
    super({
      key: 'activity.exception.notFound',
      status: HttpStatus.BAD_REQUEST,
    });
  }
}

export class ActivityNotDeletedException extends I18nHttpException {
  public constructor() {
    super({
      key: 'activity.exception.notDeleted',
      status: HttpStatus.INTERNAL_SERVER_ERROR,
    });
  }
}
