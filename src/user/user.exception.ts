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

export class UserNotOnSelf extends BadRequestException {
  public constructor() {
    super('user.exception.notOnSelf');
  }
}

export class UserCouldNotBeDeleted extends InternalServerErrorException {
  public constructor() {
    super('user.exception.couldNotBeDeleted');
  }
}
