/**
 * Created by chao
 */

import * as koa from 'koa';
import * as koaBodyparser from 'koa-bodyparser';
import * as cors from 'koa2-cors';
import * as mongoDB from './mongoDB';
import router from './router';

const app = new koa();

const heade = {
  allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
  allowMethods: ['GET', 'POST', 'DELETE'],
  credentials: true,
  exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
  maxAge: 5,
  origin: () => '*',
}

mongoDB.connect();

app

  .use(cors(heade))
  
  .use(koaBodyparser())
  
  .use(router.routes())

  .use(router.allowedMethods())

  .listen(8000);

global.console.log('http://localhost:8000/');