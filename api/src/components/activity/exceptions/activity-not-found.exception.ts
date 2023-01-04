import { BadRequestException } from '@nestjs/common';

export class ActivityNotFoundException extends BadRequestException {
  constructor() {
    super('Activity not found.');
  }
}
