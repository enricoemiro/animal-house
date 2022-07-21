import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

import {
  TokenCouldNotBeCreatedException,
  TokenNotFoundException,
} from './token.exception';
import { Token, TokenDocument } from './token.schema';

@Injectable()
export class TokenService {
  public constructor(
    @InjectModel(Token.name) private tokenModel: Model<TokenDocument>,
  ) {}

  /**
   * Create a new token.
   *
   * @param data.name Token name.
   * @param data.ownerId Token owner id.
   * @returns the created token.
   */
  public async create(data: Pick<Token, 'name' | 'ownerId'>) {
    try {
      return await new this.tokenModel(data).save();
    } catch (error: any) {
      if (error?.errors?.token) {
        throw new TokenCouldNotBeCreatedException();
      }

      throw error;
    }
  }

  /**
   * Find a token.
   *
   * @param filter.name Token name.
   * @param filter.ownerId Token owner id.
   * @param filter.uuid Token uuid (optional).
   * @returns the found token.
   */
  public async findOne(filter: Partial<Token>) {
    const token = await this.tokenModel.findOne(filter).exec();

    if (!token) {
      throw new TokenNotFoundException();
    }

    return token;
  }

  /**
   * Find a token or (if it does not exist) create it.
   *
   * @see {TokenService#create}
   * @see {TokenService#findOne}
   */
  public async findOrCreate(
    filter: Partial<Token>,
    data: Pick<Token, 'name' | 'ownerId'>,
  ) {
    try {
      return await this.findOne(filter);
    } catch (error: any) {
      if (error instanceof TokenNotFoundException) {
        return await this.create(data);
      }

      throw error;
    }
  }

  /**
   * Delete all tokens associated with the ownerId.
   *
   * @param ownerId Owner Id.
   */
  public async deleteByOwnerId(ownerId: Types.ObjectId) {
    return this.tokenModel.deleteOne({ ownerId }).exec();
  }

  /**
   * Delete a token.
   *
   * @param uuid Token uuid.
   */
  public async deleteByUUID(uuid: string) {
    return this.tokenModel.deleteOne({ uuid }).exec();
  }
}
