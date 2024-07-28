import {
  ExceptionFilter,
  HttpException,
  Catch,
  ArgumentsHost,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

import { PrismaErrors } from 'src/errors';

const getStatusCode = (
  exception: HttpException | PrismaClientKnownRequestError | unknown,
): number => {
  if (exception instanceof HttpException) {
    const statusCode = exception.getStatus();
    if (typeof statusCode === 'number') {
      return statusCode;
    }
  } else if (exception instanceof PrismaClientKnownRequestError) {
    const primsaCode = exception.code;
    if (primsaCode === PrismaErrors.PUNIQUE) {
      return HttpStatus.FORBIDDEN;
    }
    if (primsaCode === PrismaErrors.PNOTFOUND) {
      return HttpStatus.NOT_FOUND;
    }
  }

  return HttpStatus.INTERNAL_SERVER_ERROR;
};

const getErrorResponseForHttpException = (
  exception: HttpException,
): string | undefined => {
  const exceptionResponse = exception.getResponse();
  if (typeof exceptionResponse === 'string') {
    return exceptionResponse;
  } else if (typeof exceptionResponse === 'object') {
    if ('message' in exceptionResponse) {
      if (typeof exceptionResponse.message === 'string') {
        return exceptionResponse.message;
      } else if (exceptionResponse.message instanceof Array) {
        if (
          exceptionResponse.message.length > 0 &&
          typeof exceptionResponse.message[0] === 'string'
        ) {
          return exceptionResponse.message[0];
        }
      }
    }
  }
};

const getErrorResponseForPrismaClientKnownRequestError = (
  exception: PrismaClientKnownRequestError,
): string | undefined => {
  if (exception.code === PrismaErrors.PUNIQUE) {
    return 'Unique constraint';
  }
  if (exception.code === PrismaErrors.PNOTFOUND) {
    return 'Not found';
  }
};

const getResponseMessage = (
  exception: HttpException | PrismaClientKnownRequestError | unknown,
): string | undefined => {
  if (exception instanceof HttpException) {
    return getErrorResponseForHttpException(exception);
  } else if (exception instanceof PrismaClientKnownRequestError) {
    return getErrorResponseForPrismaClientKnownRequestError(exception);
  } else if (exception instanceof Error) {
    return exception.message;
  }
  return 'Unexpected error';
};

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionsFilter.name);

  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(
    exception: HttpException | PrismaClientKnownRequestError | unknown,
    host: ArgumentsHost,
  ): void {
    const { httpAdapter } = this.httpAdapterHost;
    const ctx = host.switchToHttp();

    const httpStatus = getStatusCode(exception);
    const responseMessage = getResponseMessage(exception);

    this.logger.error('Exception caught:', exception);

    const responseBody = {
      statusCode: httpStatus,
      timestamp: new Date().toISOString(),
      path: httpAdapter.getRequestUrl(ctx.getRequest()),
      detail: responseMessage || 'Something went wrong',
    };

    httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
  }
}
