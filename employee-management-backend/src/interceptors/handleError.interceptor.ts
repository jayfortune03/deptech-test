import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';

export interface ErrorResponse {
  message: string;
  error: string;
}

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse();
    const status = exception.getStatus();
    const errorResponse = exception.getResponse();

    let errorCode =
      (errorResponse as ErrorResponse).message || 'Internal Server Error';

    switch (errorCode) {
      case 'Leave are taken more than 1 for this month!': {
        errorCode = 'Too many leave in 1 month';
        break;
      }

      case 'Max leave on this year is 12!': {
        errorCode = 'Too many leave in 1 year';
        break;
      }
    }

    response.status(status).json({
      status: status,
      message:
        (errorResponse as ErrorResponse).message || 'Something went wrong!',
      error: errorCode,
    });
  }
}
