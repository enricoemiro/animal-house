import { IsMongoId } from 'class-validator';

export class DeleteByPostIdDTO {
  @IsMongoId()
  postId: string;
}
