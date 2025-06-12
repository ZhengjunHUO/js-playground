import {
  Body,
  Controller,
  Get,
  Header,
  HttpCode,
  Param,
  Post,
  Query,
  Redirect,
  Req,
} from '@nestjs/common';
import { Request } from 'express';
import { CreateCatDto } from './create-cat.dto';
import { CatsService } from './cats.service';
import { Cat } from './interfaces/cat.interface';

@Controller('cats')
export class CatsController {
  constructor(private catsSvc: CatsService) {}

  @Get()
  async findAll(@Req() request: Request): Promise<Cat[]> {
    const req_ip = request.ip;
    console.log(`Get all from ${req_ip}`);
    return this.catsSvc.findAll();
  }

  // @Get(':id')
  // findOne(@Param() params: any): string {
  //   console.log(params);
  //   return `Got #${params.id}`;
  // }
  @Get(':id')
  findOne(@Param('id') id: string): string {
    return `Got #${id}`;
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
  async create(@Body() body: CreateCatDto) {
    console.log(body);
    this.catsSvc.create(body);
  }
}
