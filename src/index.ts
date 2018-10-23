/**
 * Created by chao
 */

import * as koa from 'koa';
import * as mongoDB from './mongoDB';
import router from './router';

const app = new koa();

mongoDB.connect();

app
  .use(router.routes()).use(router.allowedMethods())

 app.listen(8000);

global.console.log('http://localhost:8000/');