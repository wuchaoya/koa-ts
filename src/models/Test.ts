/**
 * Created by chao
 */
import { DB, Schema } from '../mongoDB';

const testSchema = new Schema({
  title: Number
});

const test = DB.model('test', testSchema);

export default test;