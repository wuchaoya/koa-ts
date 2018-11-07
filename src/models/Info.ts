/**
 * Created by chao
 */
import { DB, Schema } from '../mongoDB';

const InfoSchema = new Schema({
  
  // 文章数量
  ArticleNum: Number,
  
  // 访问次数
  access: { type: Number, default: 0 },
  // 作者头像
  authorImg: String,
  
  // 文章类型
  classList: Array,
  
  github: String,
  
  // 作者名字
  name: String,
  
  // 介绍自己
  present: String,
  
  // 标签数组
  tag: Array,
  
})

const Info = DB.model('Info', InfoSchema);

export default Info;