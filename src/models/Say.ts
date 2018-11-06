import { DB, Schema } from '../mongoDB';

const saySchema = new Schema({
  create_at: { type: Date, default: Date.now() },
  say: String,
});

const say = DB.model('say', saySchema);

export default say;