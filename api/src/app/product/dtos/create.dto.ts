import { PickType } from '@nestjs/mapped-types';
import { IsNumberString } from 'class-validator';

import { ProductDTO } from '../product.dto';

export class CreateDTO extends PickType(ProductDTO, [
  'name',
  'description',
  'categoryId',
] as const) {
  @IsNumberString()
  availability: string;

  @IsNumberString()
  price: string;
}
