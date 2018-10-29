/**
 * Created by chao
 */
import {Context} from 'koa';
import DBHelper from '../DBHelper';

const {findArticleById, findArticles} = DBHelper.ArticleHelper

export default class ArticleController {
  
  public static async articles(ctx: Context) {
    const {pageIndex, pageSize, timeFile} = ctx.query;
    const respones = await findArticles({pageSize, pageIndex});
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
        articles: articles.map((item: any) => ({
          ...item._doc,
          content: item._doc.content.substr(0, 180),
        })),
        total,
      }
  }
  
  public static async article(ctx: Context) {
    const Article = await findArticleById(ctx.query.Id);
    ctx.body = Article
  }
  
}