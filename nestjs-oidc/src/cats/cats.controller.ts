import {
  Controller,
  Get,
  Header,
  HttpCode,
  Post,
  Query,
  Redirect,
  Req,
} from '@nestjs/common';
import { Request } from 'express';

@Controller('cats')
export class CatsController {
  @Get()
  findAll(@Req() request: Request): string {
    const req_ip = request.ip;
    return `To ['${req_ip}']: Fufu, fufu, fufu`;
  }

  @Get('docs')
  @Redirect('https://docs.nestjs.com', 302)
  getDocs(@Query('version') version: string) {
    if (version && version == '5') {
      return { url: 'https://docs.nestjs.com/v5/' };
    }
  }

  @Post()
  @HttpCode(204)
  @Header('Cache-Control', 'no-store')
  create(): string {
    return 'Spawn a new cat';
  }
}
