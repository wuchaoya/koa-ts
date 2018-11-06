/**
 * Created by chao
 */

import * as koaRouter from 'koa-router';
import controller from '../controller';

const router = new koaRouter();
const { ArticleController, InfoController,  SayController, UserController } = controller;

router
  .get('/info', InfoController.findInfo)
  .get('/resume', InfoController.findResume)
  .get('/article', ArticleController.article)
  .get('/articles', ArticleController.articles)
  .get('/get-say', SayController.findSay)
  
  .post('/add-article', ArticleController.addArticle)
  .post('/delete-article',ArticleController.deleteArticle)
  .post('/update-article',ArticleController.updateArticle)
  .post('/update-user', UserController.updateUser)
  .post('/login', UserController.login)
  .post('/add-say', SayController.addSay)
  .post('/delete-say', SayController.deleteSay)

export default router;