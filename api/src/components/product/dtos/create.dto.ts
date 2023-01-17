import { PickType } from '@nestjs/mapped-types';

import { ProductDTO } from '../product.dto';

export class CreateDTO extends PickType(ProductDTO, [
  'name',
  'description',
  'availability',
  'price',
  'categoryId',
]) {}
