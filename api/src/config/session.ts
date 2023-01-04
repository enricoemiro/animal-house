import { ConfigService } from '@nestjs/config';
import MongoStore from 'connect-mongo';
import { SessionOptions } from 'express-session';

const mongoStore = (configService: ConfigService) =>
  MongoStore.create({
    collectionName: 'sessions',
    mongoUrl: configService.get('DB_URL'),
    stringify: false,
  });

export const sessionOptions = (configService: ConfigService): SessionOptions => ({
  name: 'sid',
  store: mongoStore(configService),
  secret: configService.get('SESSION_SECRET'),
  resave: false,
  saveUninitialized: false,
  unset: 'destroy',
  cookie: {
    secure: false,
    httpOnly: true,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    sameSite: 'strict',
  },
});
