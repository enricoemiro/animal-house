import { PickType } from '@nestjs/mapped-types';

import { Category2DTO } from '@/app/admin/dtos/category.dto';

export class NameCategoryDTO extends PickType(Category2DTO, ['id'] as const) {}
