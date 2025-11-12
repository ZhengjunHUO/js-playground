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

interface TargetConnection {
  targetUrl: string;
  socket: WebSocket;
}

@WebSocketGateway(8088, {
  cors: {
    origin: ['http://127.0.0.1:3001', 'http://localhost:3001'],
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

    const targetUrl = 'ws://127.0.0.1:8888';
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

  // @SubscribeMessage('events')
  // onEvent(client: any, data: any): Observable<WsResponse<number>> {
  //   return from([1, 2, 3]).pipe(map(item => ({ event: 'events', data: item })));
  // }
}