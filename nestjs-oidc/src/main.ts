import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// import * as session from 'express-session';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const pg = require('pg');
  const expressSession = require('express-session');
  const pgSession = require('connect-pg-simple')(expressSession);

  const pgPool = new pg.Pool({
    database: 'nestjs',
    user: 'postgres',
    password: 'admin',
    port: 5432,
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
        tableName: 'session',
        conString: 'postgres://postgres:admin@127.0.0.1:5432/nestjs',
      }),
      secret: 'my-secret',
      resave: false,
      saveUninitialized: false,
      cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 }, // 30 days
    }),
    // session({
    //   secret: 'my-secret',
    //   resave: false,
    //   saveUninitialized: false,
    // }),
  );

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
