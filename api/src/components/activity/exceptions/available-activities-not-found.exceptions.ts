import { BadRequestException } from '@nestjs/common';

export class AvailableActivitiesNotFoundException extends BadRequestException {
  constructor() {
    super('No available activities found"');
  }
}
