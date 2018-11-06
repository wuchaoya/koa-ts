import {DB, Schema} from '../mongoDB'

const commentSchema = new Schema({
  
  comment: String,
  
  date: {type: Date, default: Date.now()},
  
  name: String,
  
})

const ArticleSchema = new Schema({
  
  // 简介
  abstract: String,
  
  // 访问次数
  access: {type: Number, default: 0},
  
  // 评论
  comment: commentSchema,
  
  // 内容
  content: String,
  
  // 创建时间
  create_at: Date,
  
  // 标签
  tag: Object,
  
  // 标题
  title: String,
  
  // 文章类型
  type: String,
  
  // 最后修改时间
  updated_at: {type: Date, default: Date.now()},
  
})

const Article = DB.model('Article', ArticleSchema)

export default Article
