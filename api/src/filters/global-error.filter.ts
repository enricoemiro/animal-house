import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';

@Catch()
export class GlobalErrorFilter implements ExceptionFilter {
  private httpAdapter: any;

  public constructor(httpAdapterHost: HttpAdapterHost) {
    this.httpAdapter = httpAdapterHost.httpAdapter;
  }

  public catch(exception: any, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const { status, ...rest } = this.exceptionHandler(exception);
    this.httpAdapter.reply(context.getResponse(), { status, ...rest }, status);
  }

  private exceptionHandler(exception: any) {
    if (exception instanceof HttpException) {
      return this.httpException(exception);
    }

    return this.defaultException(exception);
  }

  private httpException(exception: HttpException) {
    return {
      name: exception.name,
      message: exception.message,
      status: exception.getStatus(),
    };
  }

  private defaultException(exception: any) {
    console.log(exception);

    return {
      name: 'InternalServerErrorException',
      message: 'We are sorry, but something went wrong on our end. Please try again later.',
      status: 500,
    };
  }
}
