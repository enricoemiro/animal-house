import { BadRequestException } from '@nestjs/common';

export class ActivityAlreadyBookedException extends BadRequestException {
  constructor() {
    super('You have already booked this activity.');
  }
}
