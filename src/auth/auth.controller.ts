import { MailerService } from '@enricoemiro/mailer';
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  InternalServerErrorException,
  Post,
  Req,
  Session,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { I18nService } from 'nestjs-i18n';

import { HasherService } from '@app/hasher/hasher.service';
import { TokenService } from '@app/token/token.service';
import {
  UserBlockedException,
  UserNotActivatedException,
  UserPasswordMismatchException,
} from '@app/user/user.exception';
import { UserService } from '@app/user/user.service';

import { RequiresAuth } from './auth.decorator';
import {
  ActivateUserAccountDto,
  ForgotPasswordDto,
  LoginDto,
  RegisterUserDto,
  ResetPasswordDto,
} from './auth.dto';
import { AuthGuard } from './auth.guard';

@Controller('auth')
@UseGuards(AuthGuard)
@RequiresAuth(false)
export class AuthController {
  public constructor(
    private tokenService: TokenService,
    private mailerService: MailerService,
    private hasherService: HasherService,
    private userService: UserService,
    private i18nService: I18nService,
  ) {}

  @Post('register')
  public async register(@Body() { name, email, password }: RegisterUserDto) {
    const user = await this.userService.create({
      name,
      email,
      password,
    });

    const token = await this.tokenService.create({
      name: 'auth_activation',
      ownerId: user._id,
    });

    this.mailerService.sendAsyncMail('mailtrap', {
      to: user.email,
      subject: 'Animal House: Confirm your account',
      html: `${user.email}/${token.uuid}`,
    });

    return {
      message: this.i18nService.t('auth.controller.register'),
    };
  }

  @Post('activate/account')
  @HttpCode(HttpStatus.OK)
  public async activateUserAccount(
    @Body() { email, token: activationToken }: ActivateUserAccountDto,
  ) {
    const user = await this.userService.findByEmail(email);

    const token = await this.tokenService.findOne({
      name: 'auth_activation',
      ownerId: user._id,
      uuid: activationToken,
    });

    await this.userService.activate(user);
    await this.tokenService.deleteByUUID(token.uuid);

    this.mailerService.sendAsyncMail('mailtrap', {
      to: email,
      subject: 'Animal House - Account activation',
      html: `Hello ${user.name}! Your account has been successfully activated.`,
    });

    return {
      message: this.i18nService.t('auth.controller.activateUserAccount'),
    };
  }

  @Post('forgot/password')
  @HttpCode(HttpStatus.OK)
  public async forgotPassword(@Body() { email }: ForgotPasswordDto) {
    const user = await this.userService.findByEmail(email);

    const query = { name: 'auth_forgot_password', ownerId: user._id };
    const token = await this.tokenService.findOrCreate(query, query);

    this.mailerService.sendAsyncMail('mailtrap', {
      to: user.email,
      subject: 'Animal House: Forgot Password',
      html: `${user.email}/${token.uuid}`,
    });

    return {
      message: this.i18nService.t('auth.controller.forgotPassword'),
    };
  }

  @Post('reset/password')
  @HttpCode(HttpStatus.OK)
  public async resetPassword(
    @Body() { email, password, token: resetToken }: ResetPasswordDto,
  ) {
    const user = await this.userService.findByEmail(email);

    const token = await this.tokenService.findOne({
      name: 'auth_forgot_password',
      ownerId: user._id,
      uuid: resetToken,
    });

    await this.userService.updatePassword(user, password);
    await this.tokenService.deleteByUUID(token.uuid);

    this.mailerService.sendAsyncMail('mailtrap', {
      to: user.email,
      subject: 'Animal House: Reset Password',
      html: `Hello ${user.name}! Your password has been reset successfully.`,
    });

    return {
      message: this.i18nService.t('auth.controller.resetPassword'),
    };
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  public async login(
    @Body() { email, password }: LoginDto,
    @Session() session: Record<string, any>,
  ) {
    const user = await this.userService.findByEmail(email);

    if (!user.isActive) {
      throw new UserNotActivatedException();
    } else if (user.isBlocked) {
      throw new UserBlockedException();
    }

    const doPasswordsMatch = await this.hasherService.compare(
      password,
      user.password,
    );

    if (!doPasswordsMatch) {
      throw new UserPasswordMismatchException();
    }

    session.user = { id: user._id };

    return {
      message: this.i18nService.t('auth.controller.login'),
    };
  }

  @Get('logout')
  @HttpCode(HttpStatus.OK)
  @RequiresAuth(true)
  public async logout(@Req() req: Request) {
    req.session.destroy((error) => {
      if (error) {
        throw new InternalServerErrorException();
      }
    });

    return {
      message: this.i18nService.t('auth.controller.logout'),
    };
  }
}
