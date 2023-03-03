import { Body, Controller, Get, Post, Session } from '@nestjs/common';

import { RequiresAuth } from '../auth/decorators/requires-auth.decorator';
import { UserSession } from '../user/interfaces/user-session.interface';
import { UpsertDTO } from './dtos/upsert.dto';
import { GameService } from './game.service';

@Controller('/api/v1/game')
@RequiresAuth(true)
export class GameController {
  constructor(private gameService: GameService) {}

  @Post('upsert')
  async upsert(@Session() { user }: UserSession, @Body() upsertDTO: UpsertDTO) {
    await this.gameService.upsert(user.id, upsertDTO);

    return { message: 'Game created/updated succesfully' };
  }

  @Get('get/all/games')
  async getAllGames() {
    const games = await this.gameService.getAllGames();

    return games;
  }
}
