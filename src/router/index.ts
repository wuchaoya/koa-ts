/**
 * Created by chao
 */

import * as koaRouter from 'koa-router';
import controller from '../controller';

const router = new koaRouter();
const { ArticleController, InfoController,  SayController, UserController, CollectController } = controller;

router
  .get('api/get-info', InfoController.findInfo)
  .get('api/get-admin-info', InfoController.findAdminInfo)
  .get('api/get-article', ArticleController.article)
  .get('api/get-articles', ArticleController.articles)
  .get('api/get-say', SayController.findSay)
  .get('api/get-collect', CollectController.findCollect)

  .post('api/add-article', ArticleController.addArticle)
  .post('api/delete-article',ArticleController.deleteArticle)
  .post('api/update-article',ArticleController.updateArticle)
  .post('api/update-user', UserController.updateUser)
  .post('api/login', UserController.login)
  .post('api/add-say', SayController.addSay)
  .post('api/delete-say', SayController.deleteSay)
  .post('api/add-collect', CollectController.addCollect)
  .post('api/delete-collect', CollectController.deleteCollect)
export default router;