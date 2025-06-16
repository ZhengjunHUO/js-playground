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

// class ClientData {
//   idToken: string;
//   accessToken: any;
//   refreshToken: any;
//   expiresIn: any;
// }

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

    let tokenSet = await this.authService.callback(req.url, req.sessionID);
    const userinfo = await this.authService.userinfo(tokenSet);
    session.tokenSet = tokenSet;
    session.userinfo = userinfo;

    res.json({ tokenSet, userinfo });
  }

  @Get('whoami')
  whoami(@Session() session: Record<string, any>) {
    return session.userinfo || { error: 'Not logged in' };
  }
}
