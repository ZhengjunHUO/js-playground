import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsModule } from './cats/cats.module';
import {
  loggerFn,
  LoggerMiddleware,
} from './common/middleware/logger.middleware';
import { AuthModule } from './auth/auth.module';
import { RolesModule } from './roles/roles.module';
import { APP_GUARD } from '@nestjs/core';
// import { RolesGuard } from './roles/roles.guard';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { ProxyModule } from './proxy/proxy.module';
import { EventsModule } from './events/events.module';
import { ChatModule } from './chat/chat.module';

@Module({
  imports: [
    CatsModule,
    AuthModule,
    RolesModule,
    UsersModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ThrottlerModule.forRoot({
      throttlers: [
        {
          ttl: 60000,
          limit: 10,
        },
      ],
    }),
    ProxyModule,
    EventsModule,
    ChatModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    // {
    //   provide: APP_GUARD,
    //   useClass: RolesGuard,
    // },
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware, loggerFn)
      .forRoutes({ path: 'cats{/*path}', method: RequestMethod.GET });
  }
}
