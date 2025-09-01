import {
  Injectable,
  OnModuleInit,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as client from 'openid-client';
import { ConfigService } from '@nestjs/config';

export class ExpiresIn {
  accessTokenExpiresIn: string;
  refreshTokenExpiresIn: string;
}

@Injectable()
export class AuthService implements OnModuleInit {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  private config: client.Configuration;
  private hostEndpoint: string;
  private codeVerifierMap: Map<string, string>;
  private paramsMap: Map<string, Record<string, string>>;

  async onModuleInit() {
    // console.log(
    //   `OIDC_ENDPOINT: ${this.configService.get<string>('OIDC_ENDPOINT')}`,
    // );
    // console.log(`Self: ${this.getHostEndpoint()}`);
    this.hostEndpoint =
      this.configService.get<string>('APP_HOST')! +
      ':' +
      this.configService.get<number>('APP_PORT')!;
    const oidc_endpoint = this.configService.get<string>('OIDC_ENDPOINT')!;
    const oidc_client = this.configService.get<string>('OIDC_CLIENT')!;
    const oidc_client_secret =
      this.configService.get<string>('OIDC_CLIENT_SECRET')!;
    this.config = await client.discovery(
      new URL(oidc_endpoint),
      oidc_client,
      oidc_client_secret,
    );
    this.codeVerifierMap = new Map<string, string>();
    this.paramsMap = new Map<string, Record<string, string>>();
  }

  getClientConfig() {
    return this.config;
  }

  getOIDCLogoutURL(): string {
    return this.configService.get<string>('OIDC_LOGOUT_ENDPOINT')!;
  }

  getHostEndpoint(): string {
    // return this.hostEndpoint;
    return 'http://localhost/backend';
  }

  async generateAuthUrl(sessionId: string): Promise<URL> {
    console.log(`[generateAuthUrl] Get called, sessionId: ${sessionId}`);
    const codeVerifier: string = client.randomPKCECodeVerifier();
    const code_challenge: string =
      await client.calculatePKCECodeChallenge(codeVerifier);
    this.codeVerifierMap.set(sessionId, codeVerifier);

    const redirect_uri = this.getHostEndpoint() + '/auth/callback';
    const scope = 'openid profile email';
    const code_challenge_method = 'S256';

    const params: Record<string, string> = {
      redirect_uri,
      scope,
      code_challenge,
      code_challenge_method,
    };

    if (!this.config.serverMetadata().supportsPKCE()) {
      params.state = client.randomState();
    }

    const redirectTo: URL = client.buildAuthorizationUrl(this.config, params);
    this.paramsMap.set(sessionId, params);
    console.log(`[generateAuthUrl] Redirect URL: ${redirectTo}`);
    return redirectTo;
  }

  async callback(
    currentURL: string,
    sessionId: string,
  ): Promise<
    client.TokenEndpointResponse & client.TokenEndpointResponseHelpers
  > {
    console.log(`[callback] Get called, sessionId: ${sessionId}`);
    // console.log(`[callback] codeVerifierMap: ${this.codeVerifierMap}`);
    // console.log(`[callback] paramsMap: ${this.paramsMap}`);
    const codeVerifier = this.codeVerifierMap.get(sessionId);
    const params = this.paramsMap.get(sessionId);
    const tokens: client.TokenEndpointResponse &
      client.TokenEndpointResponseHelpers = await client.authorizationCodeGrant(
      this.config,
      new URL(this.getHostEndpoint() + currentURL),
      {
        pkceCodeVerifier: codeVerifier,
        expectedState: params?.state,
      },
    );
    this.codeVerifierMap.delete(sessionId);
    this.paramsMap.delete(sessionId);
    // console.log('[callback] Token Endpoint Response', tokens);
    return tokens;
  }

  async signIn(
    username: string,
    pass: string,
  ): Promise<{ access_token: string }> {
    const user = this.usersService.findOne(username);
    if (user?.password !== pass) {
      throw new UnauthorizedException();
    }
    //const payload = { sub: user.userId, username: user.username, roles: user.roles };
    const payload = { user: user };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async userinfo(
    tokenSet: client.TokenEndpointResponse &
      client.TokenEndpointResponseHelpers,
  ) {
    // const id_token_decoded = this.jwtService.decode(tokenSet.id_token!);
    // const expectedSubject = id_token_decoded.sub;
    const expectedSubject = tokenSet.claims()!.sub;
    // console.log(`[userinfo] expectedSubject: ${expectedSubject}`);

    return await client.fetchUserInfo(
      this.config,
      tokenSet.access_token,
      expectedSubject,
    );
  }

  calculateExpireIn(
    tokenSet: client.TokenEndpointResponse &
      client.TokenEndpointResponseHelpers,
    refresh_expires_in: number,
  ): ExpiresIn {
    const nowUTC = new Date();
    return {
      accessTokenExpiresIn: new Date(
        nowUTC.getTime() + tokenSet.expires_in! * 1000,
      ).toISOString(),
      refreshTokenExpiresIn: new Date(
        nowUTC.getTime() + refresh_expires_in * 1000,
      ).toISOString(),
    };
  }
}
