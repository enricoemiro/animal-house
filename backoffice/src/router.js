import { Router, operators } from 'silkrouter';

import Activities from './app/activities/templates/activities';
import Board from './app/board/templates/board';
import Categories from './app/categories/templates/categories';
import HeadOffices from './app/headOffices/templates/headOffices';
import Home from './app/home/templates/home';
import Products from './app/products/templates/products';
import Users from './app/users/template/users';

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

router.pipe(route('/backoffice/categories', router)).subscribe(async () => {
  document.getElementById('app').innerHTML = Categories.render();
  await Categories.after_render();
});

router.pipe(route('/backoffice/headoffices', router)).subscribe(async () => {
  document.getElementById('app').innerHTML = HeadOffices.render();
  await HeadOffices.after_render();
});

router.pipe(route('/backoffice/activities', router)).subscribe(async () => {
  document.getElementById('app').innerHTML = Activities.render();
  await Activities.after_render();
});

router.pipe(route('/backoffice/board', router)).subscribe(async () => {
  document.getElementById('app').innerHTML = Board.render();
  await Board.after_render();
});

router.pipe(noMatch(router)).subscribe(() => {
  router.set('/backoffice');
});
