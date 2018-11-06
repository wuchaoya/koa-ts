import Models from '../models';
import Result from '../utils/Result';

const { Say } = Models;

export default class SayHelper {
  
  public static findSay = async () => {
    const say = await Say.find({});
    const total = await Say.count({});
    return { say, total };
  }
  
  public static deleteSay = async (payload: object) => {
    const response = await Say.remove(payload);
    if (response.ok === 1) {
      return new Result({msg: '删除成功'}).Return()
    } else {
      return new Result({code: 500, msg: '删除失败'}).Return()
    }
  }
  
  public static  addSay = async (say: object) => {
    const response = await Say.create({...say,creact_at: Date.now()})
    return new Result({msg: '发表成功'}).Return()
  }
  
}