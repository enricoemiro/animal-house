import { PartialType } from '@nestjs/mapped-types';
import { IsMongoId } from 'class-validator';

import { ProductDTO } from '@/app/product/product.dto';

export class DeleteProductsDTO extends PartialType(ProductDTO) {
  @IsMongoId({ each: true })
  productIDs: string[];
}
