import { InternalServerErrorException } from '@nestjs/common';

export class LogoutException extends InternalServerErrorException {
  constructor() {
    super('An error occurred while logging out.');
  }
}
