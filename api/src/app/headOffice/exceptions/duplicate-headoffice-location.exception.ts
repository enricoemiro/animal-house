import { BadRequestException } from '@nestjs/common';

export class DuplicateHeadOfficeLocationException extends BadRequestException {
  constructor() {
    super(
      "Sorry, a head office with this location is already registered. Please choose a different location or update the existing head office's location.",
    );
  }
}
