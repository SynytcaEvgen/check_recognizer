import { ConsoleLogger } from '@nestjs/common';
import * as winston from 'winston';
import { MAIN_CONFIG } from '../config/index';

export class LoggerProvider extends ConsoleLogger {
  private readonly logger: winston.Logger = winston.createLogger({
    transports: [
      new winston.transports.File({
        level: 'error',
        filename: MAIN_CONFIG.logsFile,
      }),
    ],
  });

  error(
    message: string | Record<string, unknown>,
    trace?: string,
    context?: string,
  ): void {
    const formattedDate = new Date()
      .toISOString()
      .slice(0, 19)
      .replace('T', ' ');
    const meta = {
      context,
      time: formattedDate,
    };
    let messagePrint = '';

    if (typeof message === 'object') {
      messagePrint = JSON.stringify(
        {
          context,
          ...message,
        },
        null,
        2,
      );
    } else if (typeof message === 'string') {
      messagePrint = message;
    }

    this.logger.error(messagePrint, meta);

    super.error(message, trace, context);
  }
}
