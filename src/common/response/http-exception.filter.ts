import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { ApiResponse } from './response.interface';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const rawMessage =
      exception instanceof HttpException
        ? exception.getResponse()
        : 'Internal server error';

    const message =
      typeof rawMessage === 'string'
        ? rawMessage
        : (rawMessage as any).message || JSON.stringify(rawMessage);


    const error = exception instanceof HttpException ? {
      name: exception.name,
      message,
      status,
      ...(exception.getResponse() instanceof Object ? { options: (exception.getResponse() as any).options } : {}),
    } : 'Internal server error'


    const apiResponse: ApiResponse<null> = {
      status,
      success: false,
      message,
      data: null,
      error: process.env.NODE_ENV === 'production' ? null : error,
    };

    response.status(status).json(apiResponse);
  }
}
