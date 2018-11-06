/**
 * Created by chao
 */
import { Context } from 'koa';
import DBHelper from '../DBHelper';
import Result from '../utils/Result';

const { findInfo, findResume } = DBHelper.InfoHelper;

export default class InfoController {
  
  public static async findInfo (ctx: Context) {
    const Info = await findInfo();
    const response = new Result(Info[0]);
    ctx.body = response.Return();
  }
  
  public static async findResume (ctx: Context) {
    const Resume = await findResume();
    const response = new Result( Resume[0] );
    ctx.body = response.Return() ;
  }
  
}