import { Router, operators } from 'silkrouter';

const { route } = operators;

export const router = new Router();

router.pipe(route('/')).subscribe(() => {
  console.log('Home');
});
