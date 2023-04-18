import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { Response } from 'express';
import { errorHandler } from '@prometeo-dev/error-handler-library/dist/middlewares';

@Catch()
export class ExceptionHandlerFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();
    const request = context.getRequest<Request>();
    const errorMiddleware = errorHandler();

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    errorMiddleware(exception, request, response, () => {});
  }
}
