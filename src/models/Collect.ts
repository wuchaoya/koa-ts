import { DB, Schema } from '../mongoDB';

const CollectSchema = new Schema({
  content: String,
  create_at: Date,
  tag: Object,
  title: String
})

const Collect = DB.model('collect',  CollectSchema);

export default Collect;