/**
 * Created by chao
 */

import Models from '../models';
import { tagColors } from '../utils/Color';

const {Article} = Models;

interface IQuery {
  pageIndex: string,
  pageSize: string
}

interface IArticle {
  _id?: string;
  tag: string;
  create_at: string;
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
  };
  
  public static findArticleById = async(Id: string) => {
    const article: any = await Article.findById(Id);
    await Article.update({_id: article._id}, {access: ++article.access});
    return article;
  }
  
  public static createArticle = async (article: IArticle) => {
    const tag = {color: tagColors[Math.floor(Math.random() * 6)], title: article.tag};
    return await Article.create(
      {...article, tag, create_at: new Date()},
      (err: string, doc: object) => {
       if (err) {
         throw (err);
       } else {
         return doc;
       }
      }
    );
   
  };
  
  public static deleteArticleById = async (id: string) => {
    return await Article.remove({ _id: id })
  }
  
  public static updateArticleById = async (article: IArticle) => {
    const tag = {
      color: tagColors[Math.floor(Math.random() * 6)],
      title: article.tag,
    }
    
    const response = await Article.update(
      { _id: article._id },
      { ...article, tag }
    )
    return response
  }
  
}