import { IsMongoId } from 'class-validator';

export class OrderDTO {
  @IsMongoId()
  id: string;

  @IsMongoId()
  userId: string;

  @IsMongoId({ each: true })
  productsIDs: string[];
}
