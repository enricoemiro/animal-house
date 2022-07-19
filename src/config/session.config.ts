import { ConfigService } from '@nestjs/config';
import MongoStore from 'connect-mongo';
import express from 'express';
import session from 'express-session';

const createMongoStore = (configService: ConfigService): MongoStore => {
  return MongoStore.create({
    collectionName: configService.get('SESSION_STORE_COLLECTIONNAME'),
    mongoUrl: configService.get('SESSION_STORE_MONGOURL'),
    ttl: configService.get('SESSION_STORE_TTL'),
  });
};

export const expressSession = (
  configService: ConfigService,
): express.RequestHandler => {
  return session({
    name: configService.get('SESSION_NAME'),
    secret: configService.get('SESSION_SECRET'),
    store: createMongoStore(configService),
    cookie: {
      maxAge: configService.get('SESSION_COOKIE_MAXAGE'),
      httpOnly: true,
    },
    resave: false,
    saveUninitialized: false,
    unset: 'destroy',
  });
};
