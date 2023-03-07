import { IsMongoId, IsString } from 'class-validator';

export class Category2DTO {
  @IsString()
  name: string;
  @IsMongoId()
  id: string;
}
