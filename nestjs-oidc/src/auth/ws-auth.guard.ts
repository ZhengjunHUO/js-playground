import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthService } from './auth.service';
import * as client from 'openid-client';

const pg = require('pg');

@Injectable()
export class WsAuthGuard implements CanActivate {
  private pgPool: any;

  constructor(
    private configService: ConfigService,
    private authService: AuthService,
  ) {
    // Initialize PostgreSQL pool for session store access
    const psql_db = this.configService.get<string>('POSTGRES_DATABASE');
    const psql_user = this.configService.get<string>('POSTGRES_USER') || 'postgres';
    const psql_pwd = this.configService.get<string>('POSTGRES_PASSWORD');
    const psql_port = this.configService.get<number>('POSTGRES_PORT') || 5432;

    this.pgPool = new pg.Pool({
      database: psql_db,
      user: psql_user,
      password: psql_pwd,
      port: psql_port,
      ssl: false,
      max: 20,
      idleTimeoutMillis: 1000,
      connectionTimeoutMillis: 1000,
      maxUses: 7500,
    });
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const client = context.switchToWs().getClient();

      console.log('[WsAuthGuard] Checking WebSocket authentication');

      const cookies = client.handshake?.headers?.cookie;
      if (cookies) {
        console.log(`[Auth] Found cookies: ${cookies}`);
        const sessionCookie = cookies.split(';')
          .find((c: string) => c.trim().startsWith('connect.sid='));

        if (sessionCookie) {
          const sessionValue = sessionCookie.split('=')[1].replace("s%3A", "").split('.')[0];
          console.log(`[Auth] Found session cookie: ${sessionValue}`);

          // Access session store directly
          const session = await this.getSessionFromStore(sessionValue);
          if (!session) {
            console.log('[WsAuthGuard] Session not found in store');
            return false;
          }

          if (!session.tokenSet) {
            console.log('[WsAuthGuard] No tokenSet in session');
            return false;
          }

          const util = require('util');
          console.log(
            '[WsAuthGuard] session.tokenSet:',
            util.inspect(session.tokenSet, { depth: null }),
          );
          console.log(
            '[WsAuthGuard] session.expiresIn:',
            util.inspect(session.expiresIn, { depth: null }),
          );

          const now = new Date();
          if (now < new Date(session.expiresIn.accessTokenExpiresIn)) {
            console.log('[WsAuthGuard] Check pass');
            return true;
          }

          if (now > new Date(session.expiresIn.refreshTokenExpiresIn)) {
            console.log(
              `[WsAuthGuard] Refresh token expired ${now.toISOString()} > ${session.expiresIn.refreshTokenExpiresIn}, need to login again`,
            );
            await this.clearSessionInStore(sessionValue);
            return false;
          }

          console.log(
            `[WsAuthGuard] Access token expired: ${now.toISOString()} > ${session.expiresIn.accessTokenExpiresIn}, but refresh token is still valid ${session.expiresIn.refreshTokenExpiresIn}`,
          );
          return await this.refreshAccessToken(sessionValue, session);
        }
      }

      console.log('[Auth] No valid authentication method found');
      return false;
    } catch (error) {
      console.error('[WsAuthGuard] Error during WebSocket authentication:', error);
      return false;
    }
  }

  private async getSessionFromStore(sessionId: string): Promise<any> {
    try {
      const tableName = this.configService.get<string>('POSTGRES_TABLE');
      const query = `SELECT sess FROM ${tableName} WHERE sid = $1`;
      const result = await this.pgPool.query(query, [sessionId]);

      if (result.rows.length === 0) {
        return null;
      }

      return result.rows[0].sess;
    } catch (error) {
      console.error('[WsAuthGuard] Error getting session from store:', error);
      return null;
    }
  }

  private async updateSessionInStore(sessionId: string, sessionData: any): Promise<void> {
    try {
      const tableName = this.configService.get<string>('POSTGRES_TABLE');
      const query = `UPDATE ${tableName} SET sess = $1 WHERE sid = $2`;
      await this.pgPool.query(query, [JSON.stringify(sessionData), sessionId]);
    } catch (error) {
      console.error('[WsAuthGuard] Error updating session in store:', error);
    }
  }

  private async clearSessionInStore(sessionId: string): Promise<void> {
    try {
      const tableName = this.configService.get<string>('POSTGRES_TABLE');
      const query = `UPDATE ${tableName} SET sess = $1 WHERE sid = $2`;
      const clearedSession = {};
      await this.pgPool.query(query, [JSON.stringify(clearedSession), sessionId]);
    } catch (error) {
      console.error('[WsAuthGuard] Error clearing session in store:', error);
    }
  }

  async refreshAccessToken(sessionId: string, session: Record<string, any>): Promise<boolean> {
    const scope = 'openid profile email';

    try {
      const tokenEndpointResponse = await client.refreshTokenGrant(
        this.authService.getClientConfig(),
        session.tokenSet.refresh_token,
        {
          scope,
        },
      );

      const util = require('util');
      console.log(
        '[WsAuthGuard refreshAccessToken] tokenEndpointResponse:',
        util.inspect(tokenEndpointResponse, { depth: null }),
      );
      console.log(
        `[WsAuthGuard refreshAccessToken] session.tokenSet.refresh_expires_in: ${session.tokenSet.refresh_expires_in}`,
      );

      session.tokenSet = tokenEndpointResponse;
      session.expiresIn = this.authService.calculateExpireIn(
        tokenEndpointResponse,
        session.tokenSet.refresh_expires_in,
      );

      // Update session in store
      await this.updateSessionInStore(sessionId, session);

      return true;
    } catch (err) {
      await this.clearSessionInStore(sessionId);
      console.error('[WsAuthGuard] Error occurred during refreshAccessToken: ', err);
      return false;
    }
  }
}