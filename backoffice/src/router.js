import { Router, operators } from 'silkrouter';
import { Users } from './app/users/template/users';

// import { Users } from './app/users/template/users';

import Users2 from './app/users/template/users2';

const { route, noMatch } = operators;

export const router = new Router();

router.pipe(route('/', router)).subscribe(async () => {
  // document.getElementById('app').innerHTML = await Users();
  document.getElementById('app').innerHTML = Users2.render();
  await Users2.after_render();
});

router.pipe(noMatch(router)).subscribe(() => {
  router.set('/');
});
