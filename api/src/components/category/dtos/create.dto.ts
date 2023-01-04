import { PickType } from '@nestjs/mapped-types';

import { CategoryDTO } from '../category.dto';

export class CreateDTO extends PickType(CategoryDTO, ['name'] as const) {}
