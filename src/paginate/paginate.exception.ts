import { HttpStatus } from '@nestjs/common';

import { I18nHttpException } from '@app/i18n/i18n.interface';

export class PaginateNotFound extends I18nHttpException {
  public constructor() {
    super({
      key: 'paginate.exception.notFound',
      status: HttpStatus.BAD_REQUEST,
    });
  }
}
