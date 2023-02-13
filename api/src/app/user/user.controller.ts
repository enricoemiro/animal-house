import { Controller, Get, Session } from '@nestjs/common';

import { RequiresAuth } from '@/app/auth/decorators/requires-auth.decorator';

import { UserSession } from './interfaces/user-session.interface';
import { UserService } from './user.service';

@Controller('user')
@RequiresAuth(true)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('booked/activities')
  async bookedActivities(@Session() session: UserSession) {
    const activities = await this.userService.bookedActivities(session.user.id);

    return {
      activities: activities,
    };
  }
}
