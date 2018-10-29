/**
 * Created by chao
 */

import Models from '../models';

const {Article} = Models;

interface IQuery {
  pageIndex: string,
  pageSize: string
}

export default class ArticleHelper {
  
  public static findArticles = async(query: IQuery) => {
    const {pageIndex, pageSize} = query;
    const Skip = Number.parseInt(pageIndex, 10) * Number.parseInt(pageSize, 10) - Number.parseInt(pageSize, 10);
    const articles = await Article.find().sort({create_at: -1}).limit(Number.parseInt(pageSize, 10)).skip(Skip);
    const total = await Article.count({}, (err: string, count: number) => {
      return err || count;
    });
    return {total, articles}
  }
  
  public static findArticleById = async(Id: string) => {
    await Article.findById(Id);
  }
  
}