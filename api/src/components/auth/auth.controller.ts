import { Body, Controller, Get, Post, Session } from '@nestjs/common';
import { compare } from 'bcrypt';
import { Session as ExpressSession } from 'express-session';

import { BlockedUserException } from '@/components/user/exceptions/blocked-user.exception';
import { UserSession } from '@/components/user/interfaces/user-session.interface';
import { UserService } from '@/components/user/user.service';

import { RequiresAuth } from './decorators/requires-auth.decorator';
import { LoginDTO } from './dtos/login.dto';
import { RegisterDTO } from './dtos/register.dto';
import { InvalidCredentialsException } from './exceptions/invalid-credentials.exception';
import { LogoutException } from './exceptions/logout.exception';

@Controller('auth')
@RequiresAuth(false)
export class AuthController {
  constructor(private userService: UserService) {}

  @Post('register')
  async register(@Body() { passwordConfirmation, ...rest }: RegisterDTO) {
    await this.userService.createOne(rest);
    return { message: 'You have registered successfully.' };
  }

  @Post('login')
  async login(
    @Body() { email, password: plainPassword }: LoginDTO,
    @Session() session: UserSession,
  ) {
    const {
      id,
      password: hashedPassword,
      isBlocked,
      permissions,
    } = await this.userService.findOneByEmail(email);

    if (!(await compare(plainPassword, hashedPassword))) {
      throw new InvalidCredentialsException();
    }

    if (isBlocked) {
      throw new BlockedUserException();
    }

    session.user = { id, email, permissions };
    session.isOutdated = false;

    return { message: 'Authentication completed successfully.' };
  }

  @Get('logout')
  @RequiresAuth(true)
  logout(@Session() session: ExpressSession) {
    session.destroy((error: any) => {
      if (error) {
        throw new LogoutException();
      }
    });

    return { message: 'You are now logged out.' };
  }

  @Get('status')
  @RequiresAuth(true)
  status() {
    return { message: 'You are logged in.' };
  }
}
