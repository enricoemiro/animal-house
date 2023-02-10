import { PostCategory } from '@prisma/client';
import { Transform } from 'class-transformer';
import { IsEnum, IsMongoId, IsOptional, Length } from 'class-validator';
import xss from 'xss';

export class PostDTO {
  @IsMongoId()
  id: string;

  @Length(1, 280)
  @Transform(({ value }) => xss(value))
  content: string;

  @IsEnum(PostCategory)
  @IsOptional()
  category?: PostCategory;
}
