import Modals from '../models';

const { Collect, Info } = Modals;

interface IPayload {
  pageSize: string
  pageIndex: string
}

export default class CollectHelper {
  public static findCollect = async (payload: IPayload) => {
    const { pageIndex, pageSize } = payload
    const Skip =
      Number.parseInt(pageIndex, 10) * Number.parseInt(pageSize, 10) -
      Number.parseInt(pageSize, 10)
    const collect = await Collect.find({})
    .sort({ create_at: -1 })
    .limit(Number.parseInt(pageSize, 10))
    .skip(Skip)
    const total = await Collect.count({})
    return { collect, total }
  }
  public static deleteCollect = async (payload: object) => {
    const response = await Collect.remove(payload)
    if (response.ok === 1) {
      return { message: '删除成功' }
    } else {
      return { message: '删除失败', type: 'error' }
    }
  }
  public static addCollect = async (say: object) => {
    const response = await Collect.create({ ...say, create_at: Date.now() })
    const info: any = await Info.find({})
    if (Array.isArray(info[0].data)) {
      info[0].data.forEach((item: any) => {
        if (Number.parseInt(item.month) === new Date().getMonth() + 1) {
          item.collect += 1
        }
      })
      await Info.update({ _id: info[0]._id }, { data: info[0].data })
    }
    if (response) {
      return { message: '添加收藏成功' }
    }
  }
}
