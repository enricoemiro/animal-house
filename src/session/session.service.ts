import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection, Types } from 'mongoose';

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
   * Revoke a session.
   *
   * @param userId User id.
   * @returns the session found.
   */
  public async revoke(userId: Types.ObjectId) {
    return this.connection
      .collection(this.collectionName)
      .deleteOne({ 'session.user.id': userId });
  }
}
