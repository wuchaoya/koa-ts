/**
 * Created by chao
 */
import { DB, Schema } from '../mongoDB';

const InfoSchema = new Schema({
  
  access: { type: Number, default: 0 },
  accessData: Array,
  // 作者头像
  authorImg: String,
  // 数据
  data: Array,
  // github
  github: String,
  // 作者名字
  name: String,
  // 介绍自己
  present: String,
  
})

const Info = DB.model('Info', InfoSchema);

export default Info;