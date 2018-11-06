import { Context } from 'koa';
import Result from '../utils/Result';

const errorHandle = (ctx: Context, next: any) => {
  return next().catch((err: any) => {
    if (err.status === 401) {
      ctx.status = 200
      ctx.body = new Result({msg: '无权操作'})
    } else {
      throw err;
    }
  })
}

export default errorHandle;