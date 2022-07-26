import { Injectable } from '@nestjs/common';
import { FilterQuery, PaginateModel, PaginateOptions } from 'mongoose';

import { PaginateNotFound } from './paginate.exception';

@Injectable()
export class PaginateService {
  /**
   * Paginate docs.
   *
   * @param model Paginate model.
   * @param filter Model filter query.
   * @param options Paginate options.
   * @throws {PaginateNotFound} When no docs have been found.
   * @returns pagination object.
   */
  public async paginate(
    model: PaginateModel<any>,
    filter: FilterQuery<any>,
    options: Partial<PaginateOptions> &
      Required<Pick<PaginateOptions, 'page' | 'limit'>>,
  ) {
    const result = await model.paginate(filter, options);

    if (result.docs.length === 0) {
      throw new PaginateNotFound();
    }

    return {
      docs: result.docs,
      prevPage: result.prevPage,
      nextPage: result.nextPage,
      indexFirstDoc: result.pagingCounter,
      totalPages: result.totalPages,
    };
  }
}
