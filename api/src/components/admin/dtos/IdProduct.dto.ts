import { PickType } from '@nestjs/mapped-types';

import { ProductDTO } from '@/components/product/product.dto';

export class IdProductDTO extends PickType(ProductDTO, [
  'id',
] as const) {}