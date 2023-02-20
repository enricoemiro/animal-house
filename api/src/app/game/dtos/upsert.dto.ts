import { PickType } from '@nestjs/mapped-types';

import { GameDTO } from '../game.dto';

export class UpsertDTO extends PickType(GameDTO, ['name', 'score'] as const) {}
