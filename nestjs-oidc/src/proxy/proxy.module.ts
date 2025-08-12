import { Module } from '@nestjs/common';
import { ProxyController } from './proxy.controller';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [ProxyController],
})
export class ProxyModule {}
