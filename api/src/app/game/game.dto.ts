import { GameName } from '@prisma/client';
import { IsEnum, IsMongoId, IsNumber } from 'class-validator';

export class GameDTO {
  @IsMongoId()
  id: string;

  @IsNumber()
  score: number;

  @IsEnum(GameName)
  name: GameName;

  @IsMongoId()
  userId: string;
}
