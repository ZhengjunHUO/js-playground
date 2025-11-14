import {
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
    OnGatewayConnection,
    OnGatewayDisconnect,
    // WsResponse,
} from '@nestjs/websockets';
// import { from, Observable } from 'rxjs';
// import { map } from 'rxjs/operators';
import { Server, WebSocket } from 'ws';
import { Socket } from 'socket.io';
// import { WsAuthGuard } from 'src/auth/ws-auth.guard';
// import { UseGuards } from '@nestjs/common';

interface TargetConnection {
  targetUrl: string;
  socket: WebSocket;
}

// @UseGuards(WsAuthGuard)
@WebSocketGateway(8088, {
  cors: {
    origin: ['http://127.0.0.1', 'http://localhost', 'http://127.0.0.1:5000', 'http://localhost:5000'],
    methods: ['GET', 'POST'],
    credentials: true,
  },
})
export class EventsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  private connections = new Map<string, TargetConnection>(); // Map<client.id, TargetConnection>

  async handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);

    const isAuthenticated = await this.authenticateClient(client);
    if (!isAuthenticated) {
      console.log(`Authentication failed for client: ${client.id}`);
      client.emit('auth_error', { message: 'Authentication required' });
      client.disconnect(true);
      return;
    }

    console.log(`Client ${client.id} authenticated successfully`);

    // const targetUrl = 'ws://127.0.0.1:8888';
    const targetUrl = 'wss://127.0.0.1:6443';
    const ws = new WebSocket(targetUrl);

    ws.on('open', () => {
      console.log(`Proxy connected to ${targetUrl} for client ${client.id}`);
      this.connections.set(client.id, { targetUrl, socket: ws });
    });

    ws.on('message', (msg) => {
      // forward message from backend → client
      client.emit('proxied_message', msg.toString());
    });

    ws.on('close', () => {
      console.log(`Target WS closed for ${client.id}`);
      this.connections.delete(client.id);
    });

    ws.on('error', (err) => {
      console.error('Proxy WS error:', err);
      client.emit('proxy_error', { message: 'Downstream error', detail: err.message });
    });
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
    const target = this.connections.get(client.id);
    if (target) {
      target.socket.close();
      this.connections.delete(client.id);
    }
  }

  @SubscribeMessage('client_message')
  handleClientMessage(client: Socket, payload: any) {
    const conn = this.connections.get(client.id);
    if (conn && conn.socket.readyState === WebSocket.OPEN) {
      conn.socket.send(JSON.stringify(payload));
    } else {
      client.emit('proxy_error', { message: 'Target connection not ready' });
    }
  }

  private async authenticateClient(client: Socket): Promise<boolean> {
    try {
      // const sessionId = client.handshake?.query?.sessionId as string;
      // if (sessionId) {
      //   console.log(`[Auth] Attempting to authenticate with sessionId: ${sessionId}`);
      //   return true;
      // }

      // const auth = client.handshake?.auth;
      // if (auth?.token) {
      //   console.log(`[Auth] Found auth token: ${auth.token}`);
      //   return true;
      // }

      const cookies = client.handshake?.headers?.cookie;
      if (cookies) {
        console.log(`[Auth] Found cookies: ${cookies}`);
        const sessionCookie = cookies.split(';')
          .find(c => c.trim().startsWith('connect.sid='));

        if (sessionCookie) {
          const sessionValue = sessionCookie.split('=')[1].replace("s%3A", "");
          console.log(`[Auth] Found session cookie: ${sessionValue}`);

          // TODO: check against session store
          return true;
        }
      }

      console.log('[Auth] No valid authentication method found');
      return false;
    } catch (error) {
      console.error('[Auth] Error during client authentication:', error);
      return false;
    }
  }

  // @SubscribeMessage('events')
  // onEvent(client: any, data: any): Observable<WsResponse<number>> {
  //   return from([1, 2, 3]).pipe(map(item => ({ event: 'events', data: item })));
  // }
}