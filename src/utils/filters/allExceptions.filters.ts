import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  Inject,
  InternalServerErrorException,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { I18nService } from 'nestjs-i18n';
import { Logger } from 'winston';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  public constructor(
    @Inject(WINSTON_MODULE_PROVIDER)
    private logger: Logger,
    private i18nService: I18nService,
    private httpAdapterHost: HttpAdapterHost,
  ) {}

  public catch(exception: any, host: ArgumentsHost) {
    const { httpAdapter } = this.httpAdapterHost;

    const context = host.switchToHttp();
    const { body, statusCode } = this.handleErrors(exception);

    httpAdapter.reply(context.getResponse(), body, statusCode);
  }

  private handleErrors(exception: any) {
    this.logger.info(exception);

    if (exception instanceof HttpException) {
      return this.handleHttpException(exception);
    }

    // If the exception could not be resolved, save it in the error log.
    this.logger.error(exception);

    return this.defaultException();
  }

  private handleHttpException(exception: HttpException) {
    const [body, statusCode] = [exception.getResponse(), exception.getStatus()];

    if (typeof body === 'object') {
      (body as any).message = this.i18nService.t((body as any).message);
    }

    return {
      body,
      statusCode,
    };
  }

  private defaultException() {
    return this.handleHttpException(new InternalServerErrorException());
  }
}
