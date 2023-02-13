import { Controller, Get, Post, Session } from '@nestjs/common';

import { AnimalService } from '@/app/animal/animal.service';
import { RequiresAuth } from '@/app/auth/decorators/requires-auth.decorator';

import { UserSession } from './interfaces/user-session.interface';
import { UserService } from './user.service';

@Controller('user')
@RequiresAuth(true)
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly animalService: AnimalService,
  ) {}

  @Get('booked/activities')
  async bookedActivities(@Session() session: UserSession) {
    const activities = await this.userService.bookedActivities(session.user.id);

    return {
      activities: activities,
    };
  }

  @Get('animals')
  async getUserAnimals(@Session() session: UserSession) {
    const animals = await this.animalService.find(session.user.id);

    return {
      animals: animals,
    };
  }

  @Post('create/animal')
  async createAnimal(@Session() session: UserSession) {
    return {
      message: 'The animal has been successfully added',
    };
  }

  @Post('delete/animal')
  async deleteAnimal(@Session() session: UserSession) {
    return {
      message: 'The animal has been successfully deleted',
    };
  }
}
