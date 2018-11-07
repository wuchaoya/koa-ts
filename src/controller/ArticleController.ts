/**
 * Created by chao
 */
import {Context} from 'koa';
import DBHelper from '../DBHelper';
import Result from '../utils/Result';

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
    const respone = createArticle(ctx.request.body);
    if (respone) {
      ctx.body = new Result( {msg: '发表成功'} ).Return()
    } else {
      ctx.body = new Result( {msg: '发表成功'} ).Return()
    }
  }
  
  public static async deleteArticle(ctx: Context) {
    const respone = await deleteArticleById(ctx.request.body.id)
    if (respone.ok === 1) {
      ctx.body = new Result( {msg: '删除成功'} ).Return()
    } else {
      ctx.body = new Result( {msg: '删除失败', code: 500} ).Return()
    }
  }
  
  public static async updateArticle(ctx: Context) {
    const response = await updateArticleById(ctx.request.body)
    if (response.ok === 1) {
      ctx.body = new Result( {msg: '修改成功'} ).Return()
    } else {
      ctx.body = new Result( {msg: '修改失败', code: 500} ).Return()
    }
  }
  
}