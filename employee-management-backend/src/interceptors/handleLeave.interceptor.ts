import { HttpException } from '@nestjs/common';

export class HandleLeaveException extends HttpException {
  constructor(message: string, statusCode: number) {
    super({ message }, statusCode);
  }
}
