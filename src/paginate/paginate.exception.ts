import { BadRequestException } from '@nestjs/common';

export class PaginateNotFound extends BadRequestException {
  public constructor() {
    super('paginate.exception.notFound');
  }
}
