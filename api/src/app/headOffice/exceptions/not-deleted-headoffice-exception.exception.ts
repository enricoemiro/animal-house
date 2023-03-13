import { BadRequestException } from '@nestjs/common';

export class NotDeletedHeadOfficeException extends BadRequestException {
  constructor() {
    super('No HeadOffice was deleted.');
  }
}
