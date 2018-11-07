/**
 * Created by chao
 */

import Models from '../models';
import { tagColors } from '../utils/Color';

const {Article, Info} = Models;

interface IQuery {
  pageIndex: string
  pageSize: string
  tagTitle: string
  title: string
  type: string
  nature: string
}

interface IArticle {
  _id?: string;
  tag: string;
  create_at: string;
}

export default class ArticleHelper {
  
  public static findArticles = async(query: IQuery) => {
    const { pageSize, pageIndex, tagTitle, title, type, nature } = query
    let data: object
    if (title) {
      data = { title: new RegExp(title) }
    }
    if (tagTitle) {
      data = { ...data, 'tag.title': tagTitle }
    }
    if (type) {
      data = { ...data, type }
    }
    if (nature) {
      data = { ...data, nature }
    }
    const Skip = Number.parseInt(pageIndex, 10) * Number.parseInt(pageSize, 10) - Number.parseInt(pageSize, 10);
    const articles = await Article.find(data).sort({create_at: -1}).limit(Number.parseInt(pageSize, 10)).skip(Skip);
    const total = await Article.count({}, (err: string, count: number) => {
      return err ? false :  count;
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
    const response = await Article.create(
      {...article, tag, create_at: new Date()},
      (err: string, doc: object) => {
       if (err) {
         throw (err);
       } else {
         return doc;
       }
      }
    );
    const info: any = await Info.find({})
    if (Array.isArray(info[0].data)) {
      info[0].data.forEach((item: any) => {
        if (Number.parseInt(item.month, 10) === new Date().getMonth() + 1) {
          item.article += 1
        }
      })
      await Info.update({ _id: info[0]._id }, { data: info[0].data })
    }
    return response
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