import { PickType } from '@nestjs/mapped-types';

import { PostDTO } from '../post.dto';

export class CreateDTO extends PickType(PostDTO, ['content', 'category'] as const) {}
