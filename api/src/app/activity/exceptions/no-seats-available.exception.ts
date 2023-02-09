import { BadRequestException } from '@nestjs/common';

export class NoSeatsAvailableException extends BadRequestException {
  constructor() {
    super('The activity has no available seats.');
  }
}
