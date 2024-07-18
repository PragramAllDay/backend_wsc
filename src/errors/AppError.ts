import { HttpException } from '@nestjs/common';

class AppError extends HttpException {
  constructor(message: string, statusCode: number) {
    super(message, statusCode);
  }
}

export default AppError;
