import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { doubleCsrf } from 'csrf-csrf';
import { IoAdapter } from '@nestjs/platform-socket.io';
// import * as session from 'express-session';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    //origin: '*',
    origin: [
      'http://127.0.0.1:8501',
      'http://localhost:8501',
      'http://127.0.0.1:5000',
      'http://localhost:5000',
      'http://127.0.0.1:3001',
      'http://localhost:3001',
      'http://localhost',
    ],
    credentials: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
  });

  const {
    // invalidCsrfTokenError,
    // generateToken, // Used in routes to generate and provide a CSRF hash, along with a token cookie and token.
    // validateRequest,
    doubleCsrfProtection, // default CSRF protection middleware
  } = doubleCsrf({
    getSecret: (req) => 'some cryptographically pseudorandom secret',
    getSessionIdentifier: (req) => req.session.id, // return the requests unique identifier
  });
  app.use(doubleCsrfProtection);

  const configService = app.get(ConfigService);
  const pg = require('pg');
  const expressSession = require('express-session');
  const pgSession = require('connect-pg-simple')(expressSession);

  // console.log(`POSTGRES_SSL: ${configService.get<string>('POSTGRES_SSL')}`);
  const psql_db = configService.get<string>('POSTGRES_DATABASE');
  const psql_user = configService.get<string>('POSTGRES_USER') || 'postgres';
  const psql_pwd = configService.get<string>('POSTGRES_PASSWORD');
  const psql_port = configService.get<number>('POSTGRES_PORT') || 5432;
  const psql_table = configService.get<string>('POSTGRES_TABLE');

  const pgPool = new pg.Pool({
    database: psql_db,
    user: psql_user,
    password: psql_pwd,
    port: psql_port,
    // ssl: configService.get<boolean>('POSTGRES_SSL') || false,
    ssl: false,
    max: 20, // set pool max size to 20
    idleTimeoutMillis: 1000, // close idle clients after 1 second
    connectionTimeoutMillis: 1000, // return an error after 1 second if connection could not be established
    maxUses: 7500, // close (and replace) a connection after it has been used 7500 times (see below for discussion)
  });

  app.use(
    expressSession({
      store: new pgSession({
        pool: pgPool,
        tableName: psql_table,
        // conString: 'postgres://postgres:admin@127.0.0.1:5432/nestjs',
      }),
      secret: configService.get<string>('SESSION_SECRET'),
      resave: false,
      saveUninitialized: true,
      proxy: true,
      cookie: {
        secure: false,
        httpOnly: true,
        path: '/',
        sameSite: 'lax',
        // sameSite: 'None', // allows cross-origin cookies
        maxAge: 24 * 60 * 60 * 1000, // one day
        // maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
      },
    }),
    // session({
    //   secret: 'my-secret',
    //   resave: false,
    //   saveUninitialized: false,
    // }),
  );

  app.useWebSocketAdapter(new IoAdapter(app));

  await app.listen(configService.get<number>('APP_PORT')!);
}
bootstrap();
