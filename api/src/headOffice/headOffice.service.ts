import { Injectable, OnModuleInit } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { InjectModel } from '@nestjs/mongoose';
import { differenceBy } from 'lodash';
import { FilterQuery, PaginateModel, ProjectionType, Types } from 'mongoose';

import { ActivityDocument } from '@app/activity/activity.schema';
import { ActivityService } from '@app/activity/activity.service';
import { PaginateService } from '@app/paginate/paginate.service';

import { HeadOfficeDto } from './headOffice.dto';
import {
  HeadOfficeCouldNotBeDeletedException,
  HeadOfficeLocationAlreadyTakenException,
  HeadOfficeNotFoundException,
  HeadOfficePhoneAlreadyTakenException,
} from './headOffice.exception';
import { HeadOfficeWithId } from './headOffice.interface';
import { HeadOffice, HeadOfficeDocument } from './headOffice.schema';

@Injectable()
export class HeadOfficeService implements OnModuleInit {
  private activityService: ActivityService;

  public constructor(
    @InjectModel(HeadOffice.name)
    private headOfficeModel: PaginateModel<HeadOfficeDocument>,
    private paginateService: PaginateService,
    private moduleRef: ModuleRef,
  ) {}

  /**
   * Init activity service.
   *
   * @see {@link https://docs.nestjs.com/fundamentals/module-ref#retrieving-instances}
   */
  public onModuleInit() {
    this.activityService = this.moduleRef.get(ActivityService, {
      strict: false,
    });
  }

  /**
   * Create a new head office.
   *
   * @param data Head office object.
   * @see {@link HeadOfficeService#uniqueExceptionHandler} Unique exception handler.
   * @returns the newly created head office.
   */
  public async create(
    data: Partial<HeadOfficeDto> & Required<Omit<HeadOfficeDto, 'activities'>>,
  ) {
    try {
      return await new this.headOfficeModel(data).save();
    } catch (error: any) {
      this.uniqueExceptionHandler(error);

      throw error;
    }
  }

  /**
   * Update an head office.
   *
   * @param filter Head office filter query.
   * @param data Head office data to be updated.
   * @see {@link HeadOfficeService#uniqueExceptionHandler} Unique exception handler.
   * @returns the updated head office.
   */
  public async update(
    filter: FilterQuery<HeadOfficeWithId>,
    data: Partial<HeadOffice>,
  ) {
    try {
      return await this.headOfficeModel
        .updateOne(filter, data, { runValidators: true })
        .exec();
    } catch (error: any) {
      this.uniqueExceptionHandler(error);

      throw error;
    }
  }

  public async updateActivities(
    headOffice: HeadOfficeDocument,
    activities: ActivityDocument[],
  ) {
    const union = [];

    for (let i = 0; i < headOffice.activities.length; i++) {
      union.push(headOffice.activities[i]);
    }

    // Insert only the activity that don't already belong to the head office
    for (let i = 0; i < activities.length; i++) {
      if (!headOffice.activities.includes(activities[i]._id)) {
        union.push(activities[i]);
      }
    }

    // This means that at least one activity has been added.
    if (union.length > headOffice.activities.length) {
      await this.update({ _id: headOffice._id }, { activities: union });
    }

    // By doing that, we only get the activities that have been added.
    return differenceBy(union, headOffice.activities, '_id').map(
      (activity) => activity.name,
    );
  }

  /**
   * Find an head office.
   *
   * @param filter Head office filter query.
   * @param projection Head office projection.
   * @throws {HeadOfficeNotFoundException} When the head office is not found.
   * @returns the found head office.
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
   * Find an head office by his location.
   *
   * @param location Head office location.
   * @see {@link HeadOffice#findOne}
   */
  public async findByLocation(
    location: string,
    projection?: ProjectionType<HeadOfficeWithId>,
  ) {
    return this.findOne({ location }, projection);
  }

  /**
   * Find an head office by his id.
   *
   * @param id Head office id.
   * @see {@link HeadOffice#findOne}
   */
  public async findById(
    id: Types.ObjectId,
    projection?: ProjectionType<HeadOfficeWithId>,
  ) {
    return this.findOne({ _id: id }, projection);
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
   * Delete an head office (including all his associated activities).
   *
   * @param location Head office location.
   * @throws {HeadOfficeNotDeletedException} When the head office can not be deleted.
   */
  public async delete(location: string) {
    const headOffice = await this.findByLocation(location);

    if (headOffice.activities.length > 0) {
      await this.activityService.deleteMany(headOffice._id);
    }

    const result = await this.headOfficeModel.deleteOne({ location }).exec();

    if (result.deletedCount == 0) {
      throw new HeadOfficeCouldNotBeDeletedException();
    }
  }

  /**
   * Delete the activity in input from the headOffice that match with the filter
   *
   * @param filter Head office filter query.
   * @param activity Activity to delete.
   */
  public async deleteActivity(
    filter: FilterQuery<HeadOfficeWithId>,
    activity: ActivityDocument,
  ) {
    const headOffice = await this.findOne(filter);

    const difference = [];
    const index = headOffice.activities.indexOf(activity._id);

    for (let i = 0; i < headOffice.activities.length; i++) {
      if (i != index) {
        difference.push(headOffice.activities[i]);
      }
    }

    // This means that at least one activity has been deleted.
    if (difference.length < headOffice.activities.length) {
      await this.update({ _id: headOffice._id }, { activities: difference });
    }
  }

  /**
   * Unique exception handler.
   *
   * @param error Exception thrown.
   * @throws {HeadOfficeLocationAlreadyTakenException}
   * @throws {HeadOfficePhoneAlreadyTakenException}
   */
  private uniqueExceptionHandler(error: any) {
    if (error.errors?.location?.kind === 'unique') {
      throw new HeadOfficeLocationAlreadyTakenException();
    }

    if (error.errors?.phone?.kind === 'unique') {
      throw new HeadOfficePhoneAlreadyTakenException();
    }
  }
}
