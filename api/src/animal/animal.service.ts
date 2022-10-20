import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, PaginateModel, ProjectionType, Types } from 'mongoose';

import { PaginateService } from '@app/paginate/paginate.service';

import { AnimalCreateDto, AnimalUpdateDto } from './animal.dto';
import {
  AnimalNotDeletedException,
  AnimalNotFoundException,
} from './animal.exception';
import { AnimalWithId } from './animal.interface';
import { Animal, AnimalDocument } from './animal.schema';

@Injectable()
export class AnimalService {
  public constructor(
    @InjectModel(Animal.name)
    private animalModel: PaginateModel<AnimalDocument>,
    private paginateService: PaginateService,
  ) {}

  public async create(data: AnimalCreateDto) {
    try {
      return await new this.animalModel(data).save();
    } catch (error: any) {
      throw error;
    }
  }

  public async paginate(page: number, limit: number) {
    return this.paginateService.paginate(
      this.animalModel,
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
        ],
        leanWithId: false,
      },
    );
  }

  public async update(
    filter: FilterQuery<AnimalWithId>,
    updateData: Partial<Omit<AnimalUpdateDto, 'id'>>,
  ) {
    try {
      return this.animalModel
        .updateOne(filter, updateData, { runValidators: true })
        .exec();
    } catch (error: any) {
      throw error;
    }
  }

  public async findById(
    animalId: Types.ObjectId,
    projection?: ProjectionType<AnimalWithId>,
  ) {
    const animal = await this.animalModel.findById(animalId, projection).exec();

    if (!animal) {
      throw new AnimalNotFoundException();
    }

    return animal;
  }

  public async delete(filter: FilterQuery<AnimalWithId>) {
    const result = await this.animalModel.deleteOne(filter).exec();

    if (result.deletedCount == 0) {
      throw new AnimalNotDeletedException();
    }
  }
}
