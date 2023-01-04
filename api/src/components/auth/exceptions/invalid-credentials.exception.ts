import { BadRequestException } from '@nestjs/common';

export class InvalidCredentialsException extends BadRequestException {
  constructor() {
    super('Email or password incorrect.');
  }
}
