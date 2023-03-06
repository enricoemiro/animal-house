import { IsMongoId } from 'class-validator';

export class IdPostDTO {
  @IsMongoId()
  postId: string;
}
