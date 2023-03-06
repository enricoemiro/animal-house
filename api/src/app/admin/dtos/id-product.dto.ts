import { PickType } from '@nestjs/mapped-types';

import { ProductDTO } from '@/app/product/product.dto';

export class IdProductDTO extends PickType(ProductDTO, ['id'] as const) {}
