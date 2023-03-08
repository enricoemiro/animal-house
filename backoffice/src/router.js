import { Router, operators } from 'silkrouter';

import Home from './app/home/templates/home';
import Users from './app/users/template/users';
import Products from './app/products/templates/products';

const { route, noMatch } = operators;

export const router = new Router();

router.pipe(route('/backoffice', router)).subscribe(async () => {
  document.getElementById('app').innerHTML = Home.render();
  await Home.after_render();
});

router.pipe(route('/backoffice/users', router)).subscribe(async () => {
  document.getElementById('app').innerHTML = Users.render();
  await Users.after_render();
});

router.pipe(route('/backoffice/products', router)).subscribe(async () => {
  document.getElementById('app').innerHTML = Products.render();
  await Products.after_render();
});

router.pipe(noMatch(router)).subscribe(() => {
  router.set('/backoffice');
});
