import {
  BadRequestException,
  Controller,
  FileTypeValidator,
  Get,
  MaxFileSizeValidator,
  ParseFilePipe,
  Post,
  Req,
  UploadedFile,
  UseFilters,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AppService } from './app.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { Request } from 'express';
import { LoggerProvider, validator } from './service/index';
import { ThrottlerExceptionFilter } from './service/filter/throttler-exception.filter';
import { Throttle, ThrottlerGuard } from '@nestjs/throttler';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private logger: LoggerProvider,
  ) {
    this.logger = new LoggerProvider(AppController.name);
  }

  @Get()
  healthCheck(@Req() req: Request) {
    if (!validator(req)) {
      throw new BadRequestException('Very bad request');
    }
    this.logger.debug(req.headers.host, 'Host');
    this.logger.debug(req.headers['user-agent'], 'Client');
    return this.appService.healthCheck();
  }

  @Post('upload')
  @UseFilters(ThrottlerExceptionFilter)
  @UseGuards(ThrottlerGuard)
  @Throttle({ default: { limit: 2, ttl: 60000 } })
  @UseInterceptors(FileInterceptor('image'))
  async uploadPicture(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 10 }),
          new FileTypeValidator({
            fileType: '.(png|jpeg|jpg|gif)',
          }),
        ],
      }),
    )
    image: Express.Multer.File,
    @Req() req: Request,
  ) {
    if (!image.buffer.byteLength) {
      throw new BadRequestException('Very bad request');
    }
    if (!validator(req)) {
      throw new BadRequestException('Very bad request');
    }
    this.logger.debug('File uploaded successfully');
    this.logger.debug(req.headers.host, 'Host');
    this.logger.debug(req.headers['user-agent'], 'Client');
    return await this.appService.googleAiService(image.buffer);
  }
}
