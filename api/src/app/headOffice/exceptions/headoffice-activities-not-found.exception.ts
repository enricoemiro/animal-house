import { BadRequestException } from '@nestjs/common';

export class HeadOfficeActivitiesNotFoundException extends BadRequestException {
  constructor() {
    super('No activities associated with the head office with the specified ID were found.');
  }
}
