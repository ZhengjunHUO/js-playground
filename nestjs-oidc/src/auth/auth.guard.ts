import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { jwtConstants } from './constants';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // const request = context.switchToHttp().getRequest();
    // const token = this.extractTokenFromHeader(request);
    // if (!token) {
    //   throw new UnauthorizedException();
    // }

    // try {
    //   const payload = await this.jwtService.verifyAsync(token, {
    //     secret: jwtConstants.secret,
    //   });
    //   request['user'] = payload.user;
    //   console.log(`AuthGuard request.user: ${request.user.roles}`);
    // } catch {
    //   throw new UnauthorizedException();
    // }
    const request = context.switchToHttp().getRequest();
    const session = request.session;

    const util = require('util');
    console.log(
      '[AuthGuard] session.tokenSet:',
      util.inspect(session.tokenSet, { depth: null }),
    );
    console.log(
      '[AuthGuard] session.expiresIn:',
      util.inspect(session.expiresIn, { depth: null }),
    );

    const now = new Date();
    if (now > session.expiresIn.accessTokenExpiresIn) {
      console.log(
        `Access token expired: ${now} > ${session.expiresIn.accessTokenExpiresIn}`,
      );
      // await this.refreshAccessToken(tokenSet);
      // TODO return new tokenSet ?
    }

    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
