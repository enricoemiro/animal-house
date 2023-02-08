import { IsMongoId, IsNumberString, IsOptional } from 'class-validator';

export class PostPaginationDTO {
  @IsNumberString()
  limit: string;

  @IsMongoId()
  @IsOptional()
  before?: string;

  @IsMongoId()
  @IsOptional()
  after?: string;
}
