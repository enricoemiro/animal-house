import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, PaginateModel, ProjectionType } from 'mongoose';

import { PaginateService } from '@app/paginate/paginate.service';

import {
  HeadOfficeLocationAlreadyExistException,
  HeadOfficeNotDeletedException,
  HeadOfficeNotFoundException,
  HeadOfficePhoneAlreadyUsedException,
} from './headOffice.exception';
import { HeadOfficeWithId } from './headOffice.interface';
import { HeadOffice, HeadOfficeDocument } from './headOffice.schema';

@Injectable()
export class HeadOfficeService {
  public constructor(
    @InjectModel(HeadOffice.name)
    private headOfficeModel: PaginateModel<HeadOfficeDocument>,
    private paginateService: PaginateService,
  ) {}

  /**
   * Create new head office
   * @param data head office schema
   * @throws {HeadOfficeLocationAlreadyExistException} if there is another head office with same location
   * @throws {HeadOfficePhoneAlreadyUsedException} if there is another head office with same phone
   * @returns the newly created head office
   */
  public async create(data: HeadOffice) {
    try {
      return await new this.headOfficeModel(data).save();
    } catch (error: any) {
      this.throwUniqueException(error);
      throw error;
    }
  }

  /**
   * Delete a head office
   * @throws {HeadOfficeNotDeletedException} when can't delete the head office
   * @param location location of the head office to delete
   */
  public async delete(location: string) {
    const result = await this.headOfficeModel.deleteOne({ location }).exec();
    if (result.deletedCount == 0) {
      throw new HeadOfficeNotDeletedException();
    }
  }

  /**
   * Update head office
   * @param filter head office filter query
   * @param updatedData partial head office
   * @throws {HeadOfficeLocationAlreadyExistException} if there is another head office with same location
   * @throws {HeadOfficePhoneAlreadyUsedException} if there is another head office with same phone
   * @returns the updated head office
   */
  public async update(
    filter: FilterQuery<HeadOfficeWithId>,
    updatedData: Partial<HeadOfficeWithId>,
  ) {
    try {
      return await this.headOfficeModel
        .updateOne(filter, updatedData, { runValidators: true })
        .exec();
    } catch (error: any) {
      this.throwUniqueException(error);
      throw error;
    }
  }

  /**
   * Find head office
   * @param filter head office filter query
   * @throws {HeadOfficeNotFoundException} when no head office is found
   * @returns the found head offices
   */
  public async find(filter: FilterQuery<HeadOfficeWithId>) {
    const headOffices = await this.headOfficeModel.find(filter).exec();

    if (headOffices.length === 0) {
      throw new HeadOfficeNotFoundException();
    }

    return headOffices;
  }

  /**
   *
   * @returns found head offices
   */
  public async findAll() {
    return this.find({});
  }

  /**
   *
   * @param location location to look for
   * @param projection head office projection
   * @returns the found head office
   */
  public async findByLocation(
    location: string,
    projection?: ProjectionType<HeadOfficeWithId>,
  ) {
    return this.findOne({ location }, projection);
  }

  /**
   * Find head office
   * @param headOfficeId head office Id
   * @param projection head office projection
   * @throws {HeadOfficeNotFoundException} when no head office is found
   * @returns the found head office
   */
  public async findById(
    headOfficeId: string,
    projection?: ProjectionType<HeadOfficeWithId>,
  ) {
    const headOffice = await this.headOfficeModel
      .findById(headOfficeId, projection)
      .exec();
    if (!headOffice) {
      throw new HeadOfficeNotFoundException();
    }

    return headOffice;
  }

  /**
   * Find head office
   * @param filter head office filter query
   * @param projection head office projection
   * @throws {HeadOfficeNotFoundException} when no head office is found
   * @returns the found head office
   */
  public async findOne(
    filter: FilterQuery<HeadOfficeWithId>,
    projection?: ProjectionType<HeadOfficeWithId>,
  ): Promise<HeadOfficeDocument> {
    const headOffice = await this.headOfficeModel
      .findOne(filter, projection)
      .exec();

    if (!headOffice) {
      throw new HeadOfficeNotFoundException();
    }

    return headOffice;
  }

  /**
   * Paginate head offices.
   *
   * @param page Page to start the search.
   * @param limit Maximum number of head office to show.
   * @throws {PaginateNotFound} When no head office have been found.
   * @returns array of head offices.
   */
  public async paginate(page: number, limit: number) {
    return this.paginateService.paginate(
      this.headOfficeModel,
      {},
      {
        page,
        limit,
        leanWithId: false,
      },
    );
  }

  /**
   * Throw exception about unique error
   * @param error try and catch error
   */
  private throwUniqueException(error: any) {
    if (error.errors?.location?.kind === 'unique') {
      throw new HeadOfficeLocationAlreadyExistException();
    }
    if (error.errors?.phone?.kind === 'unique') {
      throw new HeadOfficePhoneAlreadyUsedException();
    }
  }
}
