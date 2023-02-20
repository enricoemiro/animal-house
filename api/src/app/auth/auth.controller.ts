import { Body, Controller, Get, Post, Req, Res, Session } from '@nestjs/common';
import { Request, Response } from 'express';
import { Session as ExpressSession } from 'express-session';

import { HasherService } from '@/app/hasher/hasher.service';
import { BlockedUserException } from '@/app/user/exceptions/blocked-user.exception';
import { UserSession } from '@/app/user/interfaces/user-session.interface';
import { UserService } from '@/app/user/user.service';

import { RequiresAuth } from './decorators/requires-auth.decorator';
import { SkipAuth } from './decorators/skip-auth.decorator';
import { LoginDTO } from './dtos/login.dto';
import { RegisterDTO } from './dtos/register.dto';
import { InvalidCredentialsException } from './exceptions/invalid-credentials.exception';
import { LogoutException } from './exceptions/logout.exception';

@Controller('auth')
@RequiresAuth(false)
export class AuthController {
  constructor(
    private readonly userService: UserService,
    private readonly hasherService: HasherService,
  ) {}

  @Post('register')
  async register(@Body() { passwordConfirmation, ...rest }: RegisterDTO) {
    await this.userService.createOne(rest as any);

    return {
      message: 'You have registered successfully.',
    };
  }

  @Post('login')
  async login(@Req() request: Request, @Body() { email, password: plainPassword }: LoginDTO) {
    const {
      password: hashedPassword,
      isBlocked,
      ...rest
    } = await this.userService.findOneByEmail(email);

    if (!(await this.hasherService.compare(plainPassword, hashedPassword))) {
      throw new InvalidCredentialsException();
    }

    if (isBlocked) {
      throw new BlockedUserException();
    }

    Object.assign(request.session, {
      user: rest,
      isOutdated: false,
    });

    return {
      message: 'Authentication completed successfully.',
    };
  }

  @Post('logout')
  @RequiresAuth(true)
  async logout(@Res() response: Response, @Session() session: ExpressSession) {
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
  @SkipAuth()
  async me(@Session() session: UserSession) {
    return {
      user: session?.user || null,
    };
  }
}
