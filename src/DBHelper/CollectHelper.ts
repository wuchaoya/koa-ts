import Modals from '../models';
import Result from '../utils/Result';

const { Collect } = Modals;

interface IPayload {
  pageSize: string
  pageIndex: string
}

export default class CollectHelper {

  public static findCollect = async (payload: IPayload) => {
    const { pageIndex, pageSize } = payload;
    const Skip = (Number.parseInt(pageIndex,10)-1) * Number.parseInt(pageSize,10);
    const collet =  await Collect.findById({}).sort({create_at: -1}).limit(Number.parseInt(pageSize, 10)).skip(Skip);
    const toal = await Collect.count({});
    return {collet, toal};
  }
  
  public static deleteCollect = async (payload: object) => {
    const response = await Collect.remove(payload);
    if (response.ok === 1) {
      return new Result({msg: '删除成功'}).Return()
    } else {
      return new Result({msg: '删除失败'}).Return()
    }
  }
  
  public static addCollect = async (say: object) => {
    const response = await Collect.create({...say,create_at:Date.now()});
    return new Result({msg: '添加收藏成功'}).Return()
  }
  
}