import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';

import { PermissionsNotFoundException } from './permission.exception';
import {
  Permission,
  PermissionDocument,
  PermissionName,
} from './permission.schema';

@Injectable()
export class PermissionService {
  public constructor(
    @InjectModel(Permission.name)
    private permissionModel: Model<PermissionDocument>,
  ) {}

  /**
   * Create permissions.
   *
   * @param names Permission names.
   * @returns the newly created permissions.
   */
  public async createFromNames(names: PermissionName[]) {
    const data: any = [];

    names.forEach((name) => data.push({ name }));

    // With ordered to false, the insert operation would continue
    // with any remaining documents
    return this.permissionModel.insertMany(data, { ordered: false });
  }

  /**
   * Find permissions.
   *
   * @param filter Permission filter query.
   * @returns the found permissions.
   */
  public async find(filter: FilterQuery<PermissionDocument>) {
    const permissions = await this.permissionModel.find(filter).exec();

    if (permissions.length === 0) {
      throw new PermissionsNotFoundException();
    }

    return permissions;
  }

  /**
   * Find all permissions.
   *
   * @returns the found permissions.
   */
  public async findAll() {
    return this.find({});
  }

  /**
   * Find permissions by names.
   *
   * @param names[] Permission names.
   * @returns the found permissions.
   */
  public async findByNames(names: PermissionName[]) {
    return this.find({ name: { $in: names } });
  }

  /**
   * Delete all permissions.
   */
  public async deleteAll() {
    return this.permissionModel.deleteMany({});
  }
}
