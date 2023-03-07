import { PartialType } from '@nestjs/mapped-types';
import { IsMongoId } from 'class-validator';

import { UserDTO } from '@/app/user/user.dto';

export class DeleteUsersDTO extends PartialType(UserDTO) {
  @IsMongoId({ each: true })
  userIDs: string[];
}
