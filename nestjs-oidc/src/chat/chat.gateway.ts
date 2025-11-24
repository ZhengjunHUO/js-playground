import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Logger } from '@nestjs/common';
import { ChatService } from './chat.service';

interface ChatUser {
  id: string;
  username: string;
  joinedAt: Date;
}

interface ChatMessage {
  id: string;
  user: ChatUser;
  message: string;
  timestamp: Date;
  type: 'message' | 'join' | 'leave' | 'system';
}

@WebSocketGateway(8089, {
  cors: {
    origin: ['null', 'http://127.0.0.1', 'http://localhost', 'http://127.0.0.1:5000', 'http://localhost:5000'],
    methods: ['GET', 'POST'],
    credentials: true,
  },
  namespace: '/chat',
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  private readonly logger = new Logger(ChatGateway.name);
  private connectedUsers = new Map<string, ChatUser>();

  constructor(private readonly chatService: ChatService) {}

  async handleConnection(client: Socket) {
    try {
      // Extract username from query parameters or use a default
      const username = (client.handshake.query.username as string) || `User${Math.floor(Math.random() * 1000)}`;

      const user: ChatUser = {
        id: client.id,
        username,
        joinedAt: new Date(),
      };

      this.connectedUsers.set(client.id, user);

      this.logger.log(`User ${username} (${client.id}) connected to chat`);

      // Send welcome message to the user
      client.emit('welcome', {
        message: `Welcome to the chat, ${username}!`,
        connectedUsers: Array.from(this.connectedUsers.values()).length,
      });

      // Notify other users about the new user
      const joinMessage: ChatMessage = {
        id: this.chatService.generateMessageId(),
        user,
        message: `${username} joined the chat`,
        timestamp: new Date(),
        type: 'join',
      };

      client.broadcast.emit('user_joined', joinMessage);

      // Send current online users list
      client.emit('online_users', Array.from(this.connectedUsers.values()));

      // Send recent chat history
      const recentMessages = this.chatService.getRecentMessages();
      client.emit('chat_history', recentMessages);

    } catch (error) {
      this.logger.error('Error during connection:', error);
      client.emit('connection_error', { message: 'Failed to connect to chat' });
      client.disconnect();
    }
  }

  handleDisconnect(client: Socket) {
    const user = this.connectedUsers.get(client.id);
    if (user) {
      this.logger.log(`User ${user.username} (${client.id}) disconnected from chat`);

      // Remove user from connected users
      this.connectedUsers.delete(client.id);

      // Notify other users about user leaving
      const leaveMessage: ChatMessage = {
        id: this.chatService.generateMessageId(),
        user,
        message: `${user.username} left the chat`,
        timestamp: new Date(),
        type: 'leave',
      };

      client.broadcast.emit('user_left', leaveMessage);

      // Update online users list for remaining users
      this.server.emit('online_users', Array.from(this.connectedUsers.values()));
    }
  }

  @SubscribeMessage('send_message')
  handleMessage(
    @MessageBody() data: { message: string },
    @ConnectedSocket() client: Socket,
  ) {
    const user = this.connectedUsers.get(client.id);
    if (!user) {
      client.emit('error', { message: 'User not found' });
      return;
    }

    if (!data.message || data.message.trim().length === 0) {
      client.emit('error', { message: 'Message cannot be empty' });
      return;
    }

    // Create chat message
    const chatMessage: ChatMessage = {
      id: this.chatService.generateMessageId(),
      user,
      message: data.message.trim(),
      timestamp: new Date(),
      type: 'message',
    };

    // Store message in service
    this.chatService.addMessage(chatMessage);

    // Broadcast message to all connected clients
    this.server.emit('new_message', chatMessage);

    this.logger.log(`Message from ${user.username}: ${data.message}`);
  }

  @SubscribeMessage('typing_start')
  handleTypingStart(@ConnectedSocket() client: Socket) {
    const user = this.connectedUsers.get(client.id);
    if (user) {
      client.broadcast.emit('user_typing', { user, typing: true });
    }
  }

  @SubscribeMessage('typing_stop')
  handleTypingStop(@ConnectedSocket() client: Socket) {
    const user = this.connectedUsers.get(client.id);
    if (user) {
      client.broadcast.emit('user_typing', { user, typing: false });
    }
  }

  @SubscribeMessage('get_online_users')
  handleGetOnlineUsers(@ConnectedSocket() client: Socket) {
    client.emit('online_users', Array.from(this.connectedUsers.values()));
  }

  @SubscribeMessage('ping')
  handlePing(@ConnectedSocket() client: Socket) {
    client.emit('pong', { timestamp: new Date() });
  }
}