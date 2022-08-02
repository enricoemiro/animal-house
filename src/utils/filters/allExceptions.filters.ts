import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
  Inject,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { I18nService } from 'nestjs-i18n';
import { Logger } from 'winston';

import { I18nHttpException } from '@app/i18n/i18n.interface';

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
    const { body, status } = this.exceptionHandler(exception);

    httpAdapter.reply(context.getResponse(), body, status);
  }

  /**
   * Exception handler.
   *
   * @param exception Exception thrown.
   * @returns response object.
   */
  private exceptionHandler(exception: any) {
    if (exception instanceof I18nHttpException) {
      return this.i18nHttpExceptionHandler(exception);
    }

    return this.defaultException(exception);
  }

  /**
   * I18n http exception handler.
   *
   * @param exception Exception thrown.
   * @returns response object.
   */
  private i18nHttpExceptionHandler(exception: I18nHttpException) {
    return {
      body: exception.getI18nResponse(this.i18nService),
      status: exception.getStatus(),
    };
  }

  /**
   * Default exception (internal server error).
   *
   * @param exception Exception thrown.
   * @returns response object.
   */
  private defaultException(exception: any) {
    this.logger.error(exception);

    return this.i18nHttpExceptionHandler(
      new I18nHttpException({
        key: 'exception.internalServerError',
        status: HttpStatus.INTERNAL_SERVER_ERROR,
      }),
    );
  }
}
