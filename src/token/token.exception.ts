import { BadRequestException } from '@nestjs/common';

export class TokenCouldNotBeCreatedException extends BadRequestException {
  public constructor() {
    super('token.exception.couldNotBeCreated');
  }
}

export class TokenNotFoundException extends BadRequestException {
  public constructor() {
    super('token.exception.notFound');
  }
}
