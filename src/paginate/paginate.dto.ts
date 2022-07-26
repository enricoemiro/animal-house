import { Max, Min } from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';

export class PaginateDto {
  @Min(1, { message: i18nValidationMessage('paginate.dto.page.min') })
  page: number;

  @Min(1, { message: i18nValidationMessage('paginate.dto.limit.min') })
  @Max(100, { message: i18nValidationMessage('paginate.dto.limit.max') })
  limit: number;
}
