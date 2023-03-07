import { Router, operators } from 'silkrouter';

import { Users } from './app/users/template/users';

const { route, noMatch } = operators;

export const router = new Router();

router.pipe(route('/', router)).subscribe(async () => {
  document.getElementById('app').innerHTML = await Users();
});

router.pipe(noMatch(router)).subscribe(() => {
  router.set('/');
});
