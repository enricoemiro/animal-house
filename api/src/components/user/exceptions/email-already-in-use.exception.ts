import { BadRequestException } from '@nestjs/common';

export class EmailAlreadyInUseException extends BadRequestException {
  constructor() {
    super('Email already in use.');
  }
}
