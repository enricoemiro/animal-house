import { BadRequestException } from '@nestjs/common';

export class PermissionsNotFoundException extends BadRequestException {
  public constructor() {
    super('The permissions could not be found.');
  }
}
