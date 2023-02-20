import { BadRequestException } from '@nestjs/common';

export class ProductsNotFoundException extends BadRequestException {
  constructor() {
    super('No products associated with the category with the specified ID were found.');
  }
}
