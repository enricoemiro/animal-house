import { IsLatLong, IsMongoId, IsString } from 'class-validator';

export class HeadOfficeDTO {
  @IsMongoId()
  id: string;

  @IsString()
  location: string;

  @IsString()
  streetAddress: string;

  @IsLatLong()
  coordinates: string;

  @IsMongoId({ each: true })
  activities: string[];
}
