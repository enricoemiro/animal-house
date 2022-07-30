import { Injectable } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, PaginateModel, ProjectionType, Types } from 'mongoose';

import { HeadOfficeService } from '@app/headOffice/headOffice.service';
import { PaginateService } from '@app/paginate/paginate.service';

import { ActivityDto, ActivityUpdateDto } from './activity.dto';
import {
  ActivityNotDeletedException,
  ActivityNotFoundException,
} from './activity.exception';
import { ActivityWithId } from './activity.interface';
import { Activity, ActivityDocument } from './activity.schema';

@Injectable()
export class ActivityService {
  private headOfficeService: HeadOfficeService;

  public constructor(
    @InjectModel(Activity.name)
    private activityModel: PaginateModel<ActivityDocument>,
    private paginateService: PaginateService,
    private moduleRef: ModuleRef,
  ) {}

  /**
   * Init headOffice service.
   *
   * @see {@link https://docs.nestjs.com/fundamentals/module-ref#retrieving-instances}
   */
  public onModuleInit() {
    this.headOfficeService = this.moduleRef.get(HeadOfficeService, {
      strict: false,
    });
  }
  /**
   * Create a new activity
   *
   * @param data Activity object
   * @returns the newly created activity
   */
  public async create(data: ActivityDto) {
    try {
      return await new this.activityModel(data).save();
    } catch (error: any) {
      throw error;
    }
  }

  /**
   * Find all activities that match with filter
   *
   * @param filter Activity filter query
   * @throws {ActivityNotFoundException} When the activity is not found
   * @returns an array with all founded activities
   */
  public async find(
    filter: FilterQuery<ActivityWithId>,
    projection?: ProjectionType<ActivityWithId>,
  ) {
    const activities = await this.activityModel.find(filter, projection).exec();

    if (activities.length === 0) {
      throw new ActivityNotFoundException();
    }
    return activities;
  }

  /**
   *
   * @param filter Activity filter query
   * @throws {ActivityNotFoundException} When the activity is not found
   * @returns the founded activity
   */
  public async findOne(
    filter: FilterQuery<ActivityWithId>,
    projection?: ProjectionType<ActivityWithId>,
  ): Promise<ActivityDocument> {
    const headOffice = await this.activityModel
      .findOne(filter, projection)
      .exec();

    if (!headOffice) {
      throw new ActivityNotFoundException();
    }

    return headOffice;
  }

  /**
   * Find the activity that match with the input id
   *
   * @param activityId the id of the activity to be found
   * @throws {ActivityNotFoundException} When the activity is not found
   * @returns the founded activity
   */
  public async findById(
    activityId: Types.ObjectId,
    projection?: ProjectionType<ActivityWithId>,
  ) {
    const activity = await this.activityModel
      .findById(activityId, projection)
      .populate(['ownerId', 'headOfficeId'])
      .exec();
    if (!activity) {
      throw new ActivityNotFoundException();
    }

    return activity;
  }

  /**
   * Find the activity that match with the headOfficeId in input
   *
   * @param headOfficeId the headOfficeId of the activity to be found
   * @returns an array of activities that match with the headOfficeId
   */
  public async findByHeadOfficeId(
    headOfficeId: Types.ObjectId,
    projection?: ProjectionType<ActivityWithId>,
  ) {
    return this.find({ headOfficeId: headOfficeId }, projection);
  }

  /**
   * Delete the activity that match with the filter
   * (also remove the activity from the array of the associated headOffice)
   *
   * @param filter Activity filter query
   * @throws {ActivityNotDeletedException} When no activity is deleted
   */
  public async delete(filter: FilterQuery<ActivityWithId>) {
    const activity = await this.findOne(filter);
    await this.headOfficeService.deleteActivity(
      { _id: activity.headOfficeId },
      activity,
    );

    const result = await this.activityModel.deleteOne(filter).exec();

    if (result.deletedCount == 0) {
      throw new ActivityNotDeletedException();
    }
  }

  /**
   * Delete all the activites that match with filter
   *
   * @param filter Activity filter query
   * @throws {ActivityNotDeletedException} When no activity is deleted
   */
  public async deleteMany(filter: FilterQuery<ActivityWithId>) {
    console.log(filter);
    const result = await this.activityModel.deleteMany(filter).exec();

    if (result.deletedCount == 0) {
      throw new ActivityNotDeletedException();
    }
  }

  /**
   * Update an activity
   *
   * @param filter Activity filter query
   * @param updateData the activity  data to be updated
   * @returns the updated activity
   */
  public async update(
    filter: FilterQuery<ActivityWithId>,
    updateData: Partial<ActivityUpdateDto>,
  ) {
    try {
      return this.activityModel
        .updateOne(filter, updateData, {
          runValidators: true,
        })
        .exec();
    } catch (error: any) {
      throw error;
    }
  }

  /**
   * Paginate activities
   *
   * @param page Page to start the search
   * @param limit Maximum number of activities to show
   * @throws {PaginateNotFound} When no activities have been found
   * @returns array of activities
   */
  public async paginate(page: number, limit: number) {
    return this.paginateService.paginate(
      this.activityModel,
      {},
      {
        page,
        limit,
        select: '-__v',
        populate: [
          {
            path: 'ownerId',
            select: ['name', 'email'],
          },
          {
            path: 'headOfficeId',
            select: '-__v',
          },
        ],
        leanWithId: false,
      },
    );
  }
}
