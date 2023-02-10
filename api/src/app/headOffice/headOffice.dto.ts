import { Transform } from 'class-transformer';
import { IsLatLong, IsMongoId, IsString } from 'class-validator';
import xss from 'xss';

export class HeadOfficeDTO {
  @IsMongoId()
  id: string;

  @IsString()
  @Transform(({ value }) => xss(value))
  location: string;

  @IsString()
  @Transform(({ value }) => xss(value))
  streetAddress: string;

  @IsLatLong()
  coordinates: string;

  @IsMongoId({ each: true })
  activities: string[];
}
