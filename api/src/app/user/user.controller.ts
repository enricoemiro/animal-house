import { Body, Controller, Delete, Get, Param, Post, Session } from '@nestjs/common';
import session from 'express-session';

import { AnimalService } from '@/app/animal/animal.service';
import { RequiresAuth } from '@/app/auth/decorators/requires-auth.decorator';

import { CreateUserAnimalDTO } from './dtos/create-user-animal.dto';
import { DeleteUserAnimalDTO } from './dtos/delete-user-animal.dto';
import { UpdateVipDTO } from './dtos/update-vip.dto';
import { UserSession } from './interfaces/user-session.interface';
import { UserService } from './user.service';

@Controller('/api/v1/user')
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
    const animals = await this.userService.getUserAnimals(session.user.id);

    return {
      animals: animals,
    };
  }

  @Post('animals/create')
  async createUserAnimal(
    @Body() createUserAnimalDTO: CreateUserAnimalDTO,
    @Session() session: UserSession,
  ) {
    await this.animalService.create({
      userId: session.user.id,
      ...createUserAnimalDTO,
    });

    return {
      message: 'The animal has been successfully added',
    };
  }

  @Delete('animals/delete/:id')
  async deleteUserAnimal(@Param() { id }: DeleteUserAnimalDTO) {
    await this.animalService.delete(id);

    return {
      message: 'The animal has been successfully deleted',
    };
  }

  @Post('update/vip')
  async updateVip(@Session() session: UserSession, @Body() updateVipDTO: UpdateVipDTO) {
    await this.userService.updateVip(session.user.id, updateVipDTO.vip);
    session.user.vip = updateVipDTO.vip;

    return { message: 'Vip status succesfully updated' };
  }
}
