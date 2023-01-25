import { Body, Controller, Get, Post, Session } from '@nestjs/common';

import { RequiresAuth } from '../auth/decorators/requires-auth.decorator';
import { UpdateProfileDTO } from './dtos/update-profile.dto';
import { UserSession } from './interfaces/user-session.interface';
import { UserService } from './user.service';

@Controller('user')
@RequiresAuth(true)
export class UserController {
  constructor(private userService: UserService) { }

  @Get('booked/activities')
  async bookedActivities(@Session() session: UserSession) {
    const activities = await this.userService.bookedActivities(session.user.id);
    return { activities };
  }

  @Post('update/profile')
  async updateProfile(@Body() updateProfileDTO: UpdateProfileDTO, @Session() session: UserSession) {
    await this.userService.updateProfile(session.user.id, updateProfileDTO);

    session.user.email = updateProfileDTO.email;
    session.user.name = updateProfileDTO.name;

    return { message: 'The user profile has been successfully updated.' };
  }
}
