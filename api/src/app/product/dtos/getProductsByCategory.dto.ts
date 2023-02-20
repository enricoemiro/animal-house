import { PickType } from '@nestjs/mapped-types';

import { ProductDTO } from '../product.dto';

export class GetProductsByCategoryDTO extends PickType(ProductDTO, ['categoryId']) {}
