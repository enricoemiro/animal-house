import { HttpStatus } from '@nestjs/common';

import { I18nHttpException } from '@app/i18n/i18n.interface';

export class HeadOfficeLocationAlreadyTakenException extends I18nHttpException {
  public constructor() {
    super({
      key: 'headOffice.exception.locationTaken',
      status: HttpStatus.BAD_REQUEST,
    });
  }
}

export class HeadOfficePhoneAlreadyTakenException extends I18nHttpException {
  public constructor() {
    super({
      key: 'headOffice.exception.phoneTaken',
      status: HttpStatus.BAD_REQUEST,
    });
  }
}

export class HeadOfficeNotFoundException extends I18nHttpException {
  public constructor() {
    super({
      key: 'headOffice.exception.notFound',
      status: HttpStatus.BAD_REQUEST,
    });
  }
}

export class HeadOfficeCouldNotBeDeletedException extends I18nHttpException {
  public constructor() {
    super({
      key: 'headOffice.exception.couldNotBeDeleted',
      status: HttpStatus.INTERNAL_SERVER_ERROR,
    });
  }
}
