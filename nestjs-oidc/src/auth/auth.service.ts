import {
  Injectable,
  OnModuleInit,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as client from 'openid-client';

export class ExpiresIn {
  accessTokenExpiresIn: any;
  refreshTokenExpiresIn: any;
}

@Injectable()
export class AuthService implements OnModuleInit {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  private config: client.Configuration;
  private codeVerifierMap = new Map<string, string>();
  private paramsMap = new Map<String, Record<string, string>>();

  async onModuleInit() {
    this.config = await client.discovery(
      new URL('https://dev.huo.ai:8443/realms/oidc'),
      'oidc-backend',
      '8cHU783LSC839uhapouji3dHJ34N32SC',
    );
  }

  async generateAuthUrl(sessionId: string): Promise<URL> {
    console.log(`[generateAuthUrl] Get called, sessionId: ${sessionId}`);
    let codeVerifier: string = client.randomPKCECodeVerifier();
    let code_challenge: string =
      await client.calculatePKCECodeChallenge(codeVerifier);
    this.codeVerifierMap.set(sessionId, codeVerifier);

    let redirect_uri = 'http://127.0.0.1:3000/auth/callback';
    let scope = 'openid profile email';
    let code_challenge_method = 'S256';

    let params: Record<string, string> = {
      redirect_uri,
      scope,
      code_challenge,
      code_challenge_method,
    };

    if (!this.config.serverMetadata().supportsPKCE()) {
      params.state = client.randomState();
    }

    let redirectTo: URL = client.buildAuthorizationUrl(this.config, params);
    this.paramsMap.set(sessionId, params);
    console.log(`[generateAuthUrl] Redirect URL: ${redirectTo}`);
    return redirectTo;
  }

  async callback(
    currentURL: string,
    sessionId: string,
  ): Promise<client.TokenEndpointResponse> {
    console.log(`[callback] Get called, sessionId: ${sessionId}`);
    console.log(`[callback] codeVerifierMap: ${this.codeVerifierMap}`);
    console.log(`[callback] paramsMap: ${this.paramsMap}`);
    const codeVerifier = this.codeVerifierMap.get(sessionId);
    const params = this.paramsMap.get(sessionId);
    let tokens: client.TokenEndpointResponse =
      await client.authorizationCodeGrant(
        this.config,
        new URL('http://127.0.0.1:3000' + currentURL),
        {
          pkceCodeVerifier: codeVerifier,
          expectedState: params?.state,
        },
      );
    this.codeVerifierMap.delete(sessionId);
    this.paramsMap.delete(sessionId);
    console.log('[callback] Token Endpoint Response', tokens);
    return tokens;
  }

  async signIn(
    username: string,
    pass: string,
  ): Promise<{ access_token: string }> {
    const user = await this.usersService.findOne(username);
    if (user?.password !== pass) {
      throw new UnauthorizedException();
    }
    //const payload = { sub: user.userId, username: user.username, roles: user.roles };
    const payload = { user: user };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async userinfo(tokenSet: client.TokenEndpointResponse) {
    const id_token_decoded = this.jwtService.decode(tokenSet.id_token!);
    const expectedSubject = id_token_decoded.sub;
    console.log(`[userinfo] expectedSubject: ${expectedSubject}`);

    return await client.fetchUserInfo(
      this.config,
      tokenSet.access_token,
      expectedSubject,
    );
  }
}
