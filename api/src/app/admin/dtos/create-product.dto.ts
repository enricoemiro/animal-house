import { PickType } from '@nestjs/mapped-types';

import { ProductDTO } from '@/app/product/product.dto';

export class CreateProductDTO extends PickType(ProductDTO, [
  'name',
  'description',
  'availability',
  'price',
  'categoryId',
]) {}
