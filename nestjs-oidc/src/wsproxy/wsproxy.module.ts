import { Module } from '@nestjs/common';
import { WsproxyController } from './wsproxy.controller';

@Module({
  controllers: [WsproxyController]
})
export class WsproxyModule {}
