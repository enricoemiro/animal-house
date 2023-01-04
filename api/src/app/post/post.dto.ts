import { PostCategory } from '@prisma/client';
import { IsEnum, IsMongoId, IsOptional, Length } from 'class-validator';

export class PostDTO {
  @IsMongoId()
  id: string;

  @Length(1, 280)
  content: string;

  @IsEnum(PostCategory)
  @IsOptional()
  category?: PostCategory;
}
