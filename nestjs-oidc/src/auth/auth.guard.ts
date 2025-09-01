import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import * as client from 'openid-client';
import { AuthService } from './auth.service';

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
      console.log('[AuthGuard] Check fail');
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

    const now = new Date();
    if (now < new Date(session.expiresIn.accessTokenExpiresIn)) {
      console.log('[AuthGuard] Check pass');
      return true;
    }

    if (now > new Date(session.expiresIn.refreshTokenExpiresIn)) {
      console.log(
        `[AuthGuard] Refresh token expired ${now.toISOString()} > ${session.expiresIn.refreshTokenExpiresIn}, need to login again`,
      );
      delete session.tokenSet;
      delete session.userinfo;
      delete session.expiresIn;
      return false;
    }

    console.log(
      `[AuthGuard] Access token expired: ${now.toISOString()} > ${session.expiresIn.accessTokenExpiresIn}, but refresh token is still valid ${session.expiresIn.refreshTokenExpiresIn}`,
    );
    return await this.refreshAccessToken(session);
  }

  // private extractTokenFromHeader(request: Request): string | undefined {
  //   const [type, token] = request.headers.authorization?.split(' ') ?? [];
  //   return type === 'Bearer' ? token : undefined;
  // }

  async refreshAccessToken(session: Record<string, any>): Promise<boolean> {
    const scope = 'openid profile email';
    // const resource = '';

    try {
      const tokenEndpointResponse = await client.refreshTokenGrant(
        this.authService.getClientConfig(),
        session.tokenSet.refresh_token,
        {
          scope,
          //resource,
        },
      );

      const util = require('util');
      console.log(
        '[refreshAccessToken] tokenEndpointResponse:',
        util.inspect(tokenEndpointResponse, { depth: null }),
      );
      console.log(
        `[refreshAccessToken] session.tokenSet.refresh_expires_in: ${session.tokenSet.refresh_expires_in}`,
      );

      session.tokenSet = tokenEndpointResponse;
      session.expiresIn = this.authService.calculateExpireIn(
        tokenEndpointResponse,
        session.tokenSet.refresh_expires_in,
      );

      return true;
    } catch (err) {
      delete session.tokenSet;
      delete session.userinfo;
      delete session.expiresIn;
      console.error('Error occurred during refreshAccessToken: ', err);
      return false;
    }
  }
}
