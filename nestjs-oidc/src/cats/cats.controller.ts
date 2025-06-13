import {
  Body,
  Controller,
  Get,
  Header,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Query,
  Redirect,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { CreateCatDto } from './dto/create-cat.dto';
import { CatsService } from './cats.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { Roles } from 'src/roles/roles.decorator';
import { Cat } from './interfaces/cat.interface';

@Controller('cats')
@UseGuards(AuthGuard)
export class CatsController {
  constructor(private catsSvc: CatsService) {}

  @Get()
  async findAll(@Req() request: Request): Promise<Cat[]> {
    try {
      const rslt = await this.catsSvc.findAll();
      return rslt;
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: 'Can not retrieve all',
        },
        HttpStatus.FORBIDDEN,
        {
          cause: error,
        },
      );
    }
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
  @Roles(['admin'])
  @Header('Cache-Control', 'no-store')
  async create(@Body() body: CreateCatDto) {
    console.log(body);
    this.catsSvc.create(body);
  }
}
