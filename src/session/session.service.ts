import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection, Types } from 'mongoose';

import { UserDocument } from '@app/user/user.schema';

import { UserSession } from './session.interface';

@Injectable()
export class SessionService {
  private collectionName;

  public constructor(
    private configService: ConfigService,
    @InjectConnection() private connection: Connection,
  ) {
    this.collectionName = this.configService.get(
      'SESSION_STORE_COLLECTIONNAME',
    );
  }

  /**
   * Create a user session.
   *
   * @param user UserDocument.
   * @returns the user session object.
   */
  public createFromUserDocument(user: UserDocument): UserSession {
    return {
      id: user._id,
      email: user.email,
      permissions: user.permissions.map((permission) => permission.name),
      isBlocked: user.isBlocked,
      isOutdated: false,
    };
  }

  /**
   * Invalidate a session.
   *
   * @param userId User id.
   * @returns the updated session.
   */
  public async invalidate(userId: Types.ObjectId) {
    return this.collection().findOneAndUpdate(
      { 'session.user.id': userId },
      { $set: { 'session.user.isOutdated': true } },
    );
  }

  /**
   * Revoke a session.
   *
   * @param userId User id.
   * @returns the result of the deletion.
   */
  public async revoke(userId: Types.ObjectId) {
    return this.collection().deleteOne({ 'session.user.id': userId });
  }

  /**
   * Shortcut to get the session collection.
   *
   * @returns the sessions collection.
   */
  private collection() {
    return this.connection.collection(this.collectionName);
  }
}
