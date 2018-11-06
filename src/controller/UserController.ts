import { Context } from 'koa';
import DBHelper from '../DBHelper';

const { UserHelper } = DBHelper;

export default class UserController {
  
  public static async updateUser(ctx: Context) {
    const respones = await UserHelper.updateUser();
    ctx.body = respones;
  }
  
  public static async login (ctx: Context) {
    const respones = await UserHelper.findUser(ctx.request.body);
    ctx.body = respones;
  }
  
}