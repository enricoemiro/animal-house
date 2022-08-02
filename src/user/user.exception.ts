import { HttpStatus } from '@nestjs/common';

import { I18nHttpException } from '@app/i18n/i18n.interface';

export class UserEmailTakenException extends I18nHttpException {
  public constructor() {
    super({
      key: 'user.exception.emailTaken',
      status: HttpStatus.BAD_REQUEST,
    });
  }
}

export class UserNotFoundException extends I18nHttpException {
  public constructor() {
    super({
      key: 'user.exception.notFound',
      status: HttpStatus.BAD_REQUEST,
    });
  }
}

export class UserBlockedException extends I18nHttpException {
  public constructor() {
    super({
      key: 'user.exception.blocked',
      status: HttpStatus.BAD_REQUEST,
    });
  }
}

export class UserAlreadyBlockedException extends I18nHttpException {
  public constructor() {
    super({
      key: 'user.exception.alreadyBlocked',
      status: HttpStatus.BAD_REQUEST,
    });
  }
}

export class UserAlreadyUnblockedException extends I18nHttpException {
  public constructor() {
    super({
      key: 'user.exception.alreadyUnblocked',
      status: HttpStatus.BAD_REQUEST,
    });
  }
}

export class UserAlreadyActivatedException extends I18nHttpException {
  public constructor() {
    super({
      key: 'user.exception.alreadyActivated',
      status: HttpStatus.BAD_REQUEST,
    });
  }
}

export class UserNotActivatedException extends I18nHttpException {
  public constructor() {
    super({
      key: 'user.exception.notActivated',
      status: HttpStatus.BAD_REQUEST,
    });
  }
}

export class UserPasswordMismatchException extends I18nHttpException {
  public constructor() {
    super({
      key: 'user.exception.passwordMismatch',
      status: HttpStatus.BAD_REQUEST,
    });
  }
}

export class UserCouldNotBeDeleted extends I18nHttpException {
  public constructor() {
    super({
      key: 'user.exception.couldNotBeDeleted',
      status: HttpStatus.INTERNAL_SERVER_ERROR,
    });
  }
}
