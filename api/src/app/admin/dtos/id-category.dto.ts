import { PickType } from '@nestjs/mapped-types';

import { CategoryDTO } from '@/app/category/category.dto';

export class IdCategoryDTO extends PickType(CategoryDTO, ['name'] as const) {}
