import { PickType } from '@nestjs/mapped-types';

import { ProductDTO } from '../product.dto';

export class GetProductByIdDTO extends PickType(ProductDTO, ['id']) {}
