import { BadRequestException } from '@nestjs/common';

export class DuplicateCategoryNameException extends BadRequestException {
  constructor() {
    super(
      "Sorry, a category with this name is already registered. Please choose a different name or update the existing category's name.",
    );
  }
}
