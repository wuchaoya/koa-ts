/**
 * Created by chao
 */

import * as koaRouter from 'koa-router';
import controller from '../controller';

const router = new koaRouter();
const { ArticleController, InfoController} = controller;

router
  .get('/info', InfoController.findInfo)
  .get('/resume', InfoController.findResume)
  .get('/article', ArticleController.article)
  .get('/articles', ArticleController.articles)

export default router;