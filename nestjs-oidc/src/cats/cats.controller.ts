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
  Session,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { CreateCatDto } from './dto/create-cat.dto';
import { CatsService } from './cats.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { Roles } from 'src/roles/roles.decorator';
import { Cat } from './interfaces/cat.interface';
import { Role } from 'src/enums/role.enum';
import { RolesGuard } from 'src/roles/roles.guard';

@Controller('cats')
@UseGuards(AuthGuard, RolesGuard)
export class CatsController {
  constructor(private catsSvc: CatsService) {}

  // curl -b "connect.sid=..." -H "Content-Type: application/json" -H "Authorization: Bearer ..." -v 127.0.0.1:3000/cats
  @Get()
  async findAll(@Session() session: Record<string, any>): Promise<Cat[]> {
    try {
      session.visits = session.visits ? session.visits + 1 : 1;
      console.log(`session.visits: ${session.visits}`);
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

  // curl -X POST -H "Content-Type: application/json" -d '{"name":"fufu", "age":10, "breed":"unknown"}' -v 127.0.0.1:3000/cats
  @Post()
  @HttpCode(204)
  @Roles(Role.Admin)
  @Header('Cache-Control', 'no-store')
  async create(@Body() body: CreateCatDto) {
    console.log(body);
    this.catsSvc.create(body);
  }
}
