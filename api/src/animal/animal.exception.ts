import { HttpStatus } from '@nestjs/common';

import { I18nHttpException } from '@app/i18n/i18n.interface';

export class AnimalNotFoundException extends I18nHttpException {
  public constructor() {
    super({
      key: 'animal.exception.notFound',
      status: HttpStatus.BAD_REQUEST,
    });
  }
}

export class AnimalNotDeletedException extends I18nHttpException {
  public constructor() {
    super({
      key: 'animal.exception.notDeleted',
      status: HttpStatus.INTERNAL_SERVER_ERROR,
    });
  }
}
