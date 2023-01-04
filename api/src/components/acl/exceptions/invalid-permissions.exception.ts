import { ForbiddenException } from '@nestjs/common';

export class InvalidPermissionsException extends ForbiddenException {
  constructor() {
    super('You do not have the required permissions to perform this action.');
  }
}
