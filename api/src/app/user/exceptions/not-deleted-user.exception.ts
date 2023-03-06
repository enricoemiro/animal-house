import { BadRequestException } from '@nestjs/common';

export class NotDeletedUserException extends BadRequestException {
  constructor() {
    super('No user has been deleted');
  }
}
