import {
  Injectable,
  OnModuleInit,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as client from 'openid-client';

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
      new URL('http://localhost:8080/realms/oidc'),
      'oidc-backend',
      '8cHU783LSC839uhapouji3dHJ34N32SC',
    );
  }

  async generateAuthUrl(sessionId: string): Promise<URL> {
    let codeVerifier: string = client.randomPKCECodeVerifier();
    let codeChallenge: string =
      await client.calculatePKCECodeChallenge(codeVerifier);
    this.codeVerifierMap.set(sessionId, codeVerifier);

    let redirectURL = 'http://127.0.0.1:3000/callback';
    let scope = 'openid profile email';
    let codeChallengeMethod = 'S256';

    let params: Record<string, string> = {
      redirectURL,
      scope,
      codeChallenge,
      codeChallengeMethod,
    };

    if (!this.config.serverMetadata().supportsPKCE()) {
      params.state = client.randomState();
    }

    let redirectTo: URL = client.buildAuthorizationUrl(this.config, params);
    this.paramsMap.set(sessionId, params);
    console.log(`Redirect URL: ${redirectTo}`);
    return redirectTo;
  }

  async callback(sessionId: string): Promise<client.TokenEndpointResponse> {
    const codeVerifier = this.codeVerifierMap.get(sessionId);
    const params = this.paramsMap.get(sessionId);
    let tokens: client.TokenEndpointResponse =
      await client.authorizationCodeGrant(
        this.config,
        new URL('http://127.0.0.1:3000/callback'),
        {
          pkceCodeVerifier: codeVerifier,
          expectedState: params?.state,
        },
      );
    this.codeVerifierMap.delete(sessionId);
    this.paramsMap.delete(sessionId);

    console.log('Token Endpoint Response', tokens);
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
}
