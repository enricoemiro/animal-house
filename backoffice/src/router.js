import { Router, operators } from 'silkrouter';

import { Users } from './app/users/users';

const { route, noMatch } = operators;

export const router = new Router();

router.pipe(route('/', router)).subscribe(() => {
  Users();
});

router.pipe(noMatch(router)).subscribe(() => {
  router.set('/');
});
