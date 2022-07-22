import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model, ProjectionType, Types } from 'mongoose';

import { PermissionDocument } from '@app/permission/permission.schema';

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
   */
  public async updatePermissions(
    user: UserDocument,
    permissions: PermissionDocument[],
  ) {
    permissions.forEach((permission: PermissionDocument) => {
      if (!user.permissions.includes(permission._id)) {
        user.permissions.push(permission._id);
      }
    });

    await user.save();
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
   */
  public async deletePermissions(
    user: UserDocument,
    permissions: PermissionDocument[],
  ) {
    permissions.forEach((permission: PermissionDocument) => {
      if (user.permissions.includes(permission._id)) {
        const index = user.permissions.indexOf(permission._id);
        user.permissions.splice(index, 1);
      }
    });

    await user.save();
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
}
