import { Transform } from 'class-transformer';
import { IsMongoId, IsString, Length } from 'class-validator';
import xss from 'xss';

export class AnimalDTO {
  @IsMongoId()
  id: string;

  @IsString()
  @Length(1, 128)
  @Transform(({ value }) => xss(value))
  name: string;
}
