import { PartialType } from '@nestjs/mapped-types';
import { Type } from 'class-transformer';
import { IsMongoId, IsNumber, ValidateNested } from 'class-validator';

import { OrderDTO } from '../order.dto';

export class CreateDTO extends PartialType(OrderDTO) {
  @ValidateNested({ each: true })
  @Type(() => OrderElementDTO)
  orderElements: OrderElementDTO[];
}

export class OrderElementDTO {
  @IsMongoId()
  productID: string;

  @IsNumber()
  remainingQuantity: number;
}
