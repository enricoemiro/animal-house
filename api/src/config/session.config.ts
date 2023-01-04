import { ConfigService } from '@nestjs/config';
import MongoStore from 'connect-mongo';
import { SessionOptions } from 'express-session';

const mongoStore = (configService: ConfigService) => {
  return MongoStore.create({
    collectionName: 'sessions',
    mongoUrl: configService.get('DB_URL'),
    stringify: false,
  });
};

export const sessionOptions = (configService: ConfigService): SessionOptions => {
  return {
    name: 'sid',
    store: mongoStore(configService),
    secret: configService.get('SESSION_SECRET'),
    resave: false,
    saveUninitialized: false,
    unset: 'destroy',
    cookie: {
      secure: configService.get<string>('NODE_ENV') === 'production',
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
      sameSite: 'lax',
    },
  };
};
