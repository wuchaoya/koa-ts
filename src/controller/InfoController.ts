/**
 * Created by chao
 */
import { Context } from 'koa';
import DBHelper from '../DBHelper';
import Result from '../utils/Result';

const { findInfo,  findAdminInfo  } = DBHelper.InfoHelper;

export default class InfoController {
  
  public static async findInfo (ctx: Context) {
    const Info = await findInfo();
    const response = new Result(Info);
    ctx.body = response.Return();
  }
  
  public static async findAdminInfo(ctx: Context) {
    const AdminInfo = await findAdminInfo()
    ctx.body = AdminInfo
  }
  
}