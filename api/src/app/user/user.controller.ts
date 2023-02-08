import { Body, Controller, Post, Session } from '@nestjs/common';

import { RequiresAuth } from '@/app/auth/decorators/requires-auth.decorator';

import { UpdateProfileDTO } from './dtos/update-profile.dto';
import { UserSession } from './interfaces/user-session.interface';
import { UserService } from './user.service';

@Controller('user')
@RequiresAuth(true)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('update/profile')
  async updateProfile(@Body() updateProfileDTO: UpdateProfileDTO, @Session() session: UserSession) {
    const user = await this.userService.updateProfile(session.user.id, updateProfileDTO);

    if (user) {
      session.user = {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      };
    }

    return {
      message: 'Your profile has been updated successfully.',
    };
  }
}
