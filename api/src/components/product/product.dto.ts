import { IsInt, IsMongoId, IsNumber, IsString } from 'class-validator';

export class ProductDTO {
  @IsMongoId()
  id: string;

  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsInt()
  availability: number;

  @IsNumber()
  price: number;

  @IsString({ each: true })
  images: string[];

  @IsMongoId()
  categoryId: string;
}
