import { HttpException } from '@nestjs/common';

export class HandleAuthException extends HttpException {
  constructor(message: string, statusCode: number) {
    super({ message }, statusCode);
  }
}
