import {
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';

export class UserEmailTakenException extends BadRequestException {
  public constructor() {
    super('user.exception.emailTaken');
  }
}

export class UserNotFoundException extends BadRequestException {
  public constructor() {
    super('user.exception.notFound');
  }
}

export class UserBlockedException extends BadRequestException {
  public constructor() {
    super('user.exception.blocked');
  }
}

export class UserAlreadyBlockedException extends BadRequestException {
  public constructor() {
    super('user.exception.alreadyBlocked');
  }
}

export class UserAlreadyUnblockedException extends BadRequestException {
  public constructor() {
    super('user.exception.alreadyUnblocked');
  }
}

export class UserAlreadyActivatedException extends BadRequestException {
  public constructor() {
    super('user.exception.alreadyActivated');
  }
}

export class UserNotActivatedException extends BadRequestException {
  public constructor() {
    super('user.exception.notActivated');
  }
}

export class UserPasswordMismatchException extends BadRequestException {
  public constructor() {
    super('user.exception.passwordMismatch');
  }
}

export class UserCouldNotBeDeleted extends InternalServerErrorException {
  public constructor() {
    super('user.exception.couldNotBeDeleted');
  }
}
