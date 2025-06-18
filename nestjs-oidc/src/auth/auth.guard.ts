import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { TokenEndpointResponse } from 'openid-client';
import * as client from 'openid-client';
import { AuthService, ExpiresIn } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService) {}

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

    if (!session.tokenSet) {
      return false;
    }

    const util = require('util');
    console.log(
      '[AuthGuard] session.tokenSet:',
      util.inspect(session.tokenSet, { depth: null }),
    );
    console.log(
      '[AuthGuard] session.expiresIn:',
      util.inspect(session.expiresIn, { depth: null }),
    );

    // TODO: make sure time comparaison works fine
    const now = new Date();
    if (now < session.expiresIn.accessTokenExpiresIn) {
      return true;
    }

    if (now > session.expiresIn.refreshTokenExpiresIn) {
      // TODO clean up session ?
      return false;
    }

    console.log(
      `Access token expired: ${now.toISOString()} > ${session.expiresIn.accessTokenExpiresIn}, but refresh token is still valid ${session.expiresIn.refreshTokenExpiresIn}`,
    );
    await this.refreshAccessToken(session);

    return true;
  }

  // private extractTokenFromHeader(request: Request): string | undefined {
  //   const [type, token] = request.headers.authorization?.split(' ') ?? [];
  //   return type === 'Bearer' ? token : undefined;
  // }

  async refreshAccessToken(session: Record<string, any>) {
    const scope = 'openid profile email';
    // TODO: what is Resource Indicator ?
    // const resource = '';

    let tokenEndpointResponse = await client.refreshTokenGrant(
      this.authService.getClientConfig(),
      session.tokenSet.refresh_token,
      {
        scope,
        //resource,
      },
    );

    session.tokenSet = tokenEndpointResponse;
    session.expiresIn = this.authService.calculateExpireIn(
      tokenEndpointResponse,
    );

    // TODO: error detacting & handling
    // TODO: check session do get updated in psql
  }
}
