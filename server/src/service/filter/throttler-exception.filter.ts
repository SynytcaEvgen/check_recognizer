import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
} from '@nestjs/common';
import { ThrottlerException } from '@nestjs/throttler';

@Catch(ThrottlerException)
export class ThrottlerExceptionFilter implements ExceptionFilter {
  catch(exception: ThrottlerException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const message = 'TOO_MANY_REQUESTS';
    const statusCode = HttpStatus.TOO_MANY_REQUESTS;

    response.status(statusCode).json({
      statusCode,
      message,
    });
  }
}
