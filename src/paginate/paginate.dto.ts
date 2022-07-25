import { IsInt, Max, Min } from 'class-validator';

export class PaginateDto {
  @IsInt()
  @Min(1)
  page: number;

  @IsInt()
  @Min(1)
  @Max(100)
  limit: number;
}
