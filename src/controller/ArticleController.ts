/**
 * Created by chao
 */
import {Context} from 'koa';
import DBHelper from '../DBHelper';

const {findArticleById, findArticles, createArticle, deleteArticleById, updateArticleById} = DBHelper.ArticleHelper;

export default class ArticleController {
  
  public static async articles(ctx: Context) {
    const {timeFile} = ctx.query;
    const respones = await findArticles(ctx.query);
    const {articles, total} = respones;
    ctx.body = timeFile ?
      {
        articles: articles.map((item: any) => {
          const {_id, create_at, title} = item._doc;
          return {_id, create_at, title}
        }),
        total
      } :
      {
        articles,
        total,
      }
  }
  
  public static async article(ctx: Context) {
    ctx.body = await findArticleById(ctx.query.Id);
  }
  
  public static async addArticle (ctx: Context) {
    const response= createArticle(ctx.request.body);
    if (response) {
      ctx.body = { message: '发表文章成功' }
    } else {
      ctx.body = { message: '操作失败' }
    }
  }
  
  public static async deleteArticle(ctx: Context) {
    const response = await deleteArticleById(ctx.request.body.id)
    if (response.ok === 1) {
      ctx.body = { message: '文章删除成功' }
    } else {
      ctx.body = { message: '操作失败' }
    }
  }
  
  public static async updateArticle(ctx: Context) {
    const response = await updateArticleById(ctx.request.body)
    if (response.ok === 1) {
      ctx.body = { message: '文章修改成功' }
    } else {
      ctx.body = { message: '操作失败' }
    }
  }
  
}