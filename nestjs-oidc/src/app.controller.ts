import { Controller, Get, Req, Res, Session } from '@nestjs/common';
import { AppService } from './app.service';
import { Request, Response } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('protected')
  protected(
    @Session() session: Record<string, any>,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    // const util = require('util');
    // console.log('[protected] id_token_decoded:', util.inspect(session.cookie, {depth: null}));
    if (session.userinfo) {
      console.log('[protected] In if');
      res.json(session.userinfo);
    } else {
      session.origin_url = req.url;
      res.redirect('/auth/login');
    }
  }
}
