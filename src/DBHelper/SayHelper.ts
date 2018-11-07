import Models from '../models';
import Result from '../utils/Result';

const { Say, Info } = Models;


interface IPayload {
  pageSize: string
  pageIndex: string
}

export default class SayHelper {
  
  public static findSay = async (payload: IPayload) => {
    const Skip = (Number.parseInt(payload.pageIndex, 10) -1) * Number.parseInt(payload.pageSize, 10);
    const say = await Say.find({}).sort({create_at: -1}).limit(Number.parseInt(payload.pageSize, 10)).skip(Skip);
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
    const response = await Say.create({ ...say, create_at: Date.now() })
    const info: any = await Info.find({})
    if (Array.isArray(info[0].data)) {
      info[0].data.forEach((item: any) => {
        if (Number.parseInt(item.month,10) === new Date().getMonth() + 1) {
          item.say += 1
        }
      })
      await Info.update({ _id: info[0]._id }, { data: info[0].data })
    }
    if (response) {
      return new Result({msg: '发表成功'}).Return()
    }
  }
  
}