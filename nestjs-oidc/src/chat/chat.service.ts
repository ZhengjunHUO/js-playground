import { Injectable, Logger } from '@nestjs/common';

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

@Injectable()
export class ChatService {
  private readonly logger = new Logger(ChatService.name);
  private messages: ChatMessage[] = [];
  private readonly maxStoredMessages = 100; // Keep last 100 messages in memory

  constructor() {
    // Add a welcome system message
    this.addSystemMessage('Chat server started. Welcome to the chat!');
  }

  generateMessageId(): string {
    return `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  addMessage(message: ChatMessage): void {
    this.messages.push(message);

    // Keep only the last N messages to prevent memory issues
    if (this.messages.length > this.maxStoredMessages) {
      this.messages = this.messages.slice(-this.maxStoredMessages);
    }

    this.logger.debug(`Message added: ${message.type} from ${message.user.username}`);
  }

  addSystemMessage(content: string): void {
    const systemMessage: ChatMessage = {
      id: this.generateMessageId(),
      user: {
        id: 'system',
        username: 'System',
        joinedAt: new Date(),
      },
      message: content,
      timestamp: new Date(),
      type: 'system',
    };

    this.addMessage(systemMessage);
  }

  getRecentMessages(limit: number = 20): ChatMessage[] {
    return this.messages.slice(-limit);
  }

  getAllMessages(): ChatMessage[] {
    return [...this.messages];
  }

  getMessagesByUser(userId: string): ChatMessage[] {
    return this.messages.filter(msg => msg.user.id === userId);
  }

  getMessagesByType(type: ChatMessage['type']): ChatMessage[] {
    return this.messages.filter(msg => msg.type === type);
  }

  getMessagesAfterTime(timestamp: Date): ChatMessage[] {
    return this.messages.filter(msg => msg.timestamp > timestamp);
  }

  clearMessages(): void {
    this.messages = [];
    this.addSystemMessage('Chat history cleared');
    this.logger.log('Chat messages cleared');
  }

  getStats() {
    return {
      totalMessages: this.messages.length,
      messagesByType: {
        message: this.getMessagesByType('message').length,
        join: this.getMessagesByType('join').length,
        leave: this.getMessagesByType('leave').length,
        system: this.getMessagesByType('system').length,
      },
      oldestMessage: this.messages.length > 0 ? this.messages[0].timestamp : null,
      newestMessage: this.messages.length > 0 ? this.messages[this.messages.length - 1].timestamp : null,
    };
  }
}