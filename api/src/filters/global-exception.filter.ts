import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  public constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  public catch(exception: any, host: ArgumentsHost) {
    // In certain situations `httpAdapter` might not be available in the
    // constructor method, thus we should resolve it here.
    const { httpAdapter } = this.httpAdapterHost;

    const context = host.switchToHttp();
    const { status, ...rest } = this.exceptionHandler(exception);
    httpAdapter.reply(context.getResponse(), { status, ...rest }, status);
  }

  private exceptionHandler(exception: any) {
    if (exception instanceof HttpException) {
      return this.httpException(exception);
    }

    return this.defaultException(exception);
  }

  private httpException(exception: HttpException) {
    const response: any = {
      name: exception.name,
      message: exception.message,
      status: exception.getStatus(),
    };

    const { validationErrors }: any = exception.getResponse() || {};
    if (validationErrors) {
      response.validationErrors = validationErrors;
    }

    return response;
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
