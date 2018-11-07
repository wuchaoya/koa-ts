/**
 * Created by chao
 */
import * as _ from 'lodash'
import Models from '../models';

const {Article, Info, Resume } = Models;

export default class InfoHelper {
  
  public static findInfo = async () => {
    const articles: any[] = await Article.find({}, { _id: 1, tag: 1, title: 1 })
    const tag = _.uniqBy(articles.map(item => item.tag), 'title')
    const info: any = await Info.find({})
    await Info.update({ _id: info[0]._id }, { access: ++info[0].access })
    const lastArticle = articles
    .filter((item, index) => index < 10)
    .map(item => ({ _id: item._id, title: item.title }))
    return { ...info[0]._doc, tag, lastArticle }
  }
  
  public static findResume = async () => {
    return await Resume.find({});
  }
  
}