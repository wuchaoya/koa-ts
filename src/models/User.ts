import { DB, Schema } from '../mongoDB';

const userSchema = new Schema({
  password: String,
  userName: String,
});

const user = DB.model('user', userSchema);

export default user;