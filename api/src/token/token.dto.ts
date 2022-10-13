import { IsUUID } from 'class-validator';
import { i18nValidationMessage as t } from 'nestjs-i18n';

export class TokenDto {
  @IsUUID(4, { message: t('validation.string.uuid4') })
  token: string;
}
