import { PickType } from '@nestjs/mapped-types';

import { ProductDTO } from '../product.dto';

export class UpdatePictureDTO extends PickType(ProductDTO, ['id']) {}
