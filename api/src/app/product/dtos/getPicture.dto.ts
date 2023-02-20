import { PickType } from '@nestjs/mapped-types';

import { ProductDTO } from '../product.dto';

export class GetPictureDTO extends PickType(ProductDTO, ['id']) {}
