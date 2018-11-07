/**
 * Created by chao
 */

import * as koaRouter from 'koa-router';
import controller from '../controller';

const router = new koaRouter();
const { ArticleController, InfoController,  SayController, UserController, CollectController } = controller;

router
  .get('/get-info', InfoController.findInfo)
  .get('/get-resume', InfoController.findResume)
  .get('/get-article', ArticleController.article)
  .get('/get-articles', ArticleController.articles)
  .get('/get-say', SayController.findSay)
  .get('/get-collect', CollectController.findCollect)

.post('/add-article', ArticleController.addArticle)
  .post('/delete-article',ArticleController.deleteArticle)
  .post('/update-article',ArticleController.updateArticle)
  .post('/update-user', UserController.updateUser)
  .post('/login', UserController.login)
  .post('/add-say', SayController.addSay)
  .post('/delete-say', SayController.deleteSay)
  .post('/add-collect', CollectController.addCollect)
  .post('/delete-collect', CollectController.deleteCollect)
export default router;