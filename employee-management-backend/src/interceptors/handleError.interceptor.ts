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

    response.status(status).json({
      statusCode: status,
      message:
        (errorResponse as ErrorResponse).message || 'Something went wrong!',
      error: (errorResponse as ErrorResponse).error || 'Internal Server Error',
    });
  }
}
