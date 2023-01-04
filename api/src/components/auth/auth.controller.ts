import { Body, Controller, Get, Post, Res, Session } from '@nestjs/common';
import { compare } from 'bcrypt';
import { Response } from 'express';
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
    @Res({ passthrough: false }) response: Response,
    @Body() { email, password: plainPassword }: LoginDTO,
    @Session() session: UserSession,
  ) {
    const {
      password: hashedPassword,
      isBlocked,
      ...rest
    } = await this.userService.findOneByEmail(email);

    if (!(await compare(plainPassword, hashedPassword))) {
      throw new InvalidCredentialsException();
    }

    if (isBlocked) {
      throw new BlockedUserException();
    }

    session.user = rest;
    session.isOutdated = false;

    return response.status(200).json({
      message: 'Authentication completed successfully.',
    });
  }

  @Get('logout')
  @RequiresAuth(true)
  logout(@Res({ passthrough: false }) response: Response, @Session() session: ExpressSession) {
    session.destroy((error: any) => {
      if (error) {
        throw new LogoutException();
      }

      response.clearCookie('sid');

      return response.status(200).json({
        message: 'You are now logged out.',
      });
    });
  }

  @Get('me')
  @RequiresAuth(true)
  me(@Session() session: UserSession) {
    return { user: session.user };
  }
}
