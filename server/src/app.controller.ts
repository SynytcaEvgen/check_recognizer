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
  UseInterceptors,
} from '@nestjs/common';
import { AppService } from './app.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { Request } from 'express';
import { validator } from './service/index';
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  healthCheck(@Req() req: Request) {
    console.log(req.headers);
    if (!validator(req)) {
      throw new BadRequestException('Very bad request');
    }
    return this.appService.healthCheck();
  }
  // @ApiOperation({ summary: 'Upload profile picture' })
  // @ApiResponse({
  //   status: 201,
  //   type: User,
  //   description: 'upload profile picture',
  // })
  // @ApiBearerAuth()
  // @UseGuards(JwtAuthGaurd)
  // // @UsePipes(ValidationPipe)
  @Post('upload')
  @UseInterceptors(FileInterceptor('image'))
  async uploadPicture(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 2048 * 2048 * 2 }),
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
    await this.appService.googleAiService(image.buffer);
    return 'done';
  }
}
