import { Controller } from '@nestjs/common';
import {
    WebSocketGateway,
    WebSocketServer,
    OnGatewayConnection,
    OnGatewayDisconnect,
    SubscribeMessage,
  } from '@nestjs/websockets';
  import { Server, Socket } from 'socket.io';
  import WebSocket from 'ws';

interface TargetConnection {
    targetUrl: string;
    socket: WebSocket;
}

@Controller('wsproxy')
@WebSocketGateway(3000, { transports: ['websocket'], namespace: '/wsproxy', cors: true })
export class WsproxyController implements OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer() server: Server;
    private connections = new Map<string, TargetConnection>(); // Map<client.id, TargetConnection>
  
    async handleConnection(client: Socket) {
      console.log(`Client connected: ${client.id}`);
  
      const targetUrl = this.getTargetFromClient(client);
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
  
    private getTargetFromClient(client: Socket): string {
    //   // Example decision logic
    //   // - Use query param `?service=a`
    //   // - Or JWT claim `client.user.service`
    //   const service = client.handshake.query['service'];
    //   switch (service) {
    //     case 'a':
    //       return 'wss://service-a.example.com/ws';
    //     case 'b':
    //       return 'wss://service-b.example.com/ws';
    //     default:
    //       return 'wss://default-service.example.com/ws';
    //   }
        return 'wss://dev.huo.ai:6443';
    }
}