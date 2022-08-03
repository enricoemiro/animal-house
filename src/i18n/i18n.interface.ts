import { HttpException, HttpStatus } from '@nestjs/common';
import { I18nService, TranslateOptions } from 'nestjs-i18n';

export interface I18nOptions {
  key: string;
  args?: TranslateOptions;
  status: number;
}

export class I18nHttpException extends HttpException {
  public constructor(private i18nOptions: I18nOptions) {
    super(i18nOptions.key, i18nOptions.status);
  }

  public getI18nResponse(i18nService: I18nService): object {
    const { key, args, status } = this.i18nOptions;

    return {
      statusCode: status,
      message: i18nService.t(key, args),
      error: this.getDefaultDescription(),
    };
  }

  private getDefaultDescription() {
    const { status } = this.i18nOptions;

    switch (status) {
      case HttpStatus.BAD_REQUEST:
        return 'Bad Request';

      case HttpStatus.UNAUTHORIZED:
        return 'Unauthorized';

      case HttpStatus.PAYMENT_REQUIRED:
        return 'Payment Required';

      case HttpStatus.FORBIDDEN:
        return 'Forbidden';

      case HttpStatus.NOT_FOUND:
        return 'Not Found';

      case HttpStatus.METHOD_NOT_ALLOWED:
        return 'Method Not Allowed';

      case HttpStatus.NOT_ACCEPTABLE:
        return 'Not Acceptable';

      case HttpStatus.PROXY_AUTHENTICATION_REQUIRED:
        return 'Proxy Authentication Required';

      case HttpStatus.REQUEST_TIMEOUT:
        return 'Request Timeout';

      case HttpStatus.CONFLICT:
        return 'Conflict';

      case HttpStatus.GONE:
        return 'Gone';

      case HttpStatus.LENGTH_REQUIRED:
        return 'Length Required';

      case HttpStatus.PRECONDITION_FAILED:
        return 'Precondition Failed';

      case HttpStatus.PAYLOAD_TOO_LARGE:
        return 'Payload Too Large';

      case HttpStatus.URI_TOO_LONG:
        return 'Uri Too Long';

      case HttpStatus.UNSUPPORTED_MEDIA_TYPE:
        return 'Unsupported Media Type';

      case HttpStatus.REQUESTED_RANGE_NOT_SATISFIABLE:
        return 'Requested Range Not Satisfiable';

      case HttpStatus.EXPECTATION_FAILED:
        return 'Expectation Failed';

      case HttpStatus.I_AM_A_TEAPOT:
        return 'I Am A Teapot';

      case HttpStatus.MISDIRECTED:
        return 'Misdirected';

      case HttpStatus.UNPROCESSABLE_ENTITY:
        return 'Unprocessable Entity';

      case HttpStatus.FAILED_DEPENDENCY:
        return 'Failed Dependency';

      case HttpStatus.PRECONDITION_REQUIRED:
        return 'Precondition Required';

      case HttpStatus.TOO_MANY_REQUESTS:
        return 'Too Many Requests';

      case HttpStatus.INTERNAL_SERVER_ERROR:
        return 'Internal Server Error';

      case HttpStatus.NOT_IMPLEMENTED:
        return 'Not Implemented';

      case HttpStatus.BAD_GATEWAY:
        return 'Bad Gateway';

      case HttpStatus.SERVICE_UNAVAILABLE:
        return 'Service Unavailable';

      case HttpStatus.GATEWAY_TIMEOUT:
        return 'Gateway Timeout';

      case HttpStatus.HTTP_VERSION_NOT_SUPPORTED:
        return 'Http Version Not Supported';

      default:
        throw new Error(`Invalid Http Status Code: ${status}`);
    }
  }
}
