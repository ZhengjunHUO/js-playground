import {
  Body,
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  Req,
  Res,
  Session,
  Get,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Request, Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: Record<string, any>) {
    return this.authService.signIn(signInDto.username, signInDto.password);
  }

  @Get('login')
  async login(@Req() req: Request, @Res() res: Response) {
    console.log(`[login] req.sessionID: ${req.sessionID}`);
    const url = await this.authService.generateAuthUrl(req.sessionID);
    res.redirect(url.href);
  }

  @Get('callback')
  async callback(
    @Req() req: Request,
    @Res() res: Response,
    @Session() session: Record<string, any>,
  ) {
    console.log(`[callback] req.url: ${req.url}`);
    console.log(`[callback] req.sessionID: ${req.sessionID}`);

    const tokenSet = await this.authService.callback(req.url, req.sessionID);
    const userinfo = await this.authService.userinfo(tokenSet);

    // TODO: refine what to save in session store

    session.tokenSet = tokenSet;
    session.userinfo = userinfo;

    console.log(
      `[callback] session.tokenSet.refresh_expires_in: ${session.tokenSet.refresh_expires_in}`,
    );
    session.expiresIn = this.authService.calculateExpireIn(
      tokenSet,
      session.tokenSet.refresh_expires_in,
    );

    // const id_token_decoded = this.jwtService.decode(tokenSet.id_token!);
    // const util = require('util');
    // console.log('[callback] id_token_decoded:', util.inspect(id_token_decoded, {depth: null}));
    if (session.origin_url) {
      const orig_url = 'http://127.0.0.1:3000' + session.origin_url;
      console.log(`[callback] Redirect back to: ${orig_url}`);
      delete session.origin_url;
      res.redirect(orig_url);
    } else {
      res.json({ tokenSet, userinfo });
    }
  }

  @Get('whoami')
  whoami(@Session() session: Record<string, any>) {
    return session.userinfo || { error: 'Not logged in' };
  }

  @Get('logout')
  logout(
    @Req() req: Request,
    @Res() res: Response,
    @Session() session: Record<string, any>,
  ) {
    if (session.tokenSet) {
      req.session.destroy((err) => {
        if (err) {
          console.error(`[logout] Error occurred: ${err}`);
          return res.status(500).send('Failed to log out');
        }

        res.clearCookie('connect.sid');
        res.redirect(
          'https://dev.huo.ai:8443/realms/oidc/protocol/openid-connect/logout',
        );
      });
    } else {
      res.json({ error: 'Not logged in' });
    }
  }
}
