import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { differenceBy, unionBy } from 'lodash';
import { FilterQuery, Model, ProjectionType, Types } from 'mongoose';

import {
  PermissionDocument,
  PermissionName,
} from '@app/permission/permission.schema';

import {
  UserEmailTakenException,
  UserNotFoundException,
} from './user.exception';
import { UserWithId } from './user.interface';
import { User, UserDocument } from './user.schema';

@Injectable()
export class UserService {
  public constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  /**
   * Create a new user.
   *
   * @param data User object.
   * @returns the newly created user.
   */
  public async create(
    data: Partial<User> & Required<Pick<User, 'name' | 'email' | 'password'>>,
  ) {
    try {
      return await new this.userModel(data).save();
    } catch (error: any) {
      if (error.errors?.email?.kind === 'unique') {
        throw new UserEmailTakenException();
      }

      throw error;
    }
  }

  /**
   * Update a user.
   *
   * @param filter The filter user query.
   * @param data The user data to be updated.
   * @returns the updated user.
   */
  public async update(
    filter: FilterQuery<UserWithId>,
    data: Partial<UserWithId>,
  ) {
    try {
      return await this.userModel
        .updateOne(filter, data, { runValidators: true })
        .exec();
    } catch (error: any) {
      if (error.errors?.email?.kind === 'unique') {
        throw new UserEmailTakenException();
      }

      throw error;
    }
  }

  /**
   * Update user password.
   *
   * @param user User to be updated.
   * @param newPassword User new password.
   */
  public async updatePassword(user: UserDocument, newPassword: string) {
    user.password = newPassword;
    await user.save();
  }

  /**
   * Update user permissions.
   *
   * @param user User to be updated.
   * @param permissions Permissions to be added.
   * @returns array of added permissions.
   */
  public async updatePermissions(
    user: UserDocument,
    permissions: PermissionDocument[],
  ): Promise<PermissionName[]> {
    const union = unionBy(user.permissions, permissions, 'name');

    // This means that at least one permission has been added.
    if (union.length > user.permissions.length) {
      await this.update({ _id: user._id }, { permissions: union });
    }

    // By doing that, we only get the permissions that have been added.
    return differenceBy(union, user.permissions, 'name').map(
      (permission) => permission.name,
    );
  }

  /**
   * Find a user.
   *
   * @param filter User filter query.
   * @throws {UserNotFoundException} When the user is not found.
   * @returns the found user.
   */
  public async findOne(
    filter: FilterQuery<UserWithId>,
    projection?: ProjectionType<UserWithId>,
  ): Promise<UserDocument> {
    const user = await this.userModel
      .findOne(filter, projection)
      .populate('permissions')
      .exec();

    if (!user) {
      throw new UserNotFoundException();
    }

    return user;
  }

  /**
   * Find a user by his id.
   *
   * @param id User id.
   * See {@link UserService#findOne}
   */
  public async findById(
    id: Types.ObjectId,
    projection?: ProjectionType<UserWithId>,
  ) {
    return this.findOne({ _id: id }, projection);
  }

  /**
   * Find a user by his email.
   *
   * @param email User email.
   * See {@link UserService#findOne}
   */
  public async findByEmail(
    email: string,
    projection?: ProjectionType<UserWithId>,
  ) {
    return this.findOne({ email }, projection);
  }

  /**
   * Delete a user by his id.
   *
   * @param userId User id.
   */
  public async deleteById(userId: Types.ObjectId) {
    return this.userModel.deleteOne({ _id: userId }).exec();
  }

  /**
   * Delete user permissions.
   *
   * @param user UserDocument to be updated.
   * @param permissions Array of PermissionDocument.
   * @returns array of deleted permissions.
   */
  public async deletePermissions(
    user: UserDocument,
    permissions: PermissionDocument[],
  ): Promise<PermissionName[]> {
    const difference = differenceBy(user.permissions, permissions, 'name');

    // This means that at least one permission has been deleted.
    if (difference.length < user.permissions.length) {
      await this.update({ _id: user._id }, { permissions: difference });
    }

    // By doing that, we only get the permissions that have been deleted.
    return differenceBy(user.permissions, difference, 'name').map(
      (permission) => permission.name,
    );
  }

  /**
   * Activate a user's account.
   *
   * @param user User to be activated.
   */
  public async activate(user: UserDocument) {
    await user.updateOne({ isActive: true }).exec();
  }

  /**
   * Block a user's account.
   *
   * @param user User to be blocked.
   */
  public async block(user: UserDocument) {
    await user.updateOne({ isBlocked: true }).exec();
  }

  /**
   * Unblock a user's account.
   *
   * @param user User to be blocked.
   */
  public async unblock(user: UserDocument) {
    await user.updateOne({ isBlocked: false }).exec();
  }
}
