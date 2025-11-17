import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';

@Injectable()
export class WsAuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const client = context.switchToWs().getClient();
      // const data = context.switchToWs().getData();

      console.log('[WsAuthGuard] Checking WebSocket authentication');

      const cookies = client.handshake?.headers?.cookie;
      if (cookies) {
        console.log(`[Auth] Found cookies: ${cookies}`);
        const sessionCookie = cookies.split(';')
          .find((c: string) => c.trim().startsWith('connect.sid='));

        if (sessionCookie) {
          const sessionValue = sessionCookie.split('=')[1].replace("s%3A", "").split('.')[0];
          console.log(`[Auth] Found session cookie: ${sessionValue}`);

          // TODO: check against session store
          return true;
        }
      }

      console.log('[Auth] No valid authentication method found');
      return false;
    } catch (error) {
      console.error('[WsAuthGuard] Error during WebSocket authentication:', error);
      return false;
    }
  }
}