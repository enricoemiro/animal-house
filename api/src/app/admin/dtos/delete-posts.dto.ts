import { PartialType } from '@nestjs/mapped-types';
import { IsMongoId } from 'class-validator';

import { PostDTO } from '@/app/post/post.dto';

export class DeletePostsDTO extends PartialType(PostDTO) {
  @IsMongoId({ each: true })
  postIDs: string[];
}
