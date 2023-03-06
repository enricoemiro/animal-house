import { PickType } from '@nestjs/mapped-types';

import { ProductDTO } from '@/app/product/product.dto';

export class EditProductDTO extends PickType(ProductDTO, [
  'name',
  'description',
  'availability',
  'price',
  'categoryId',
] as const) {}
