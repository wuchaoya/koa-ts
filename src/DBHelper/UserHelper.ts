import * as jwt from 'jsonwebtoken'
import { admin, guest } from '../config';
import Models from '../models';
import Result from '../utils/Result';

const { User } = Models;

interface Iuser {
  userName: string;
  password: string;
}

export default class InfoHelper {
  
  public static updateUser = async () => {
    const respone = await User.create({
      password: 'guest',
      userName: 'guest',
    });
  };
  
  public static findUser = async (user: Iuser) => {
    const respone: any = await User.findOne({userName: user.userName});
    if (!respone) {
      return new Result({code: 500, msg: '用户名错误'}).Return()
    } else if (user.password !== respone.password) {
      return new Result({code: 500, msg: '密码错误'}).Return()
    } else if (respone.userName === admin) {
      const { _id } = respone;
      const token = jwt.sign({_id}, admin);
      return new Result({ msg: '管理员登录成功', result: {...respone, token} }).Return()
    } else {
      const { _id } = respone;
      const token = jwt.sign({_id}, guest);
      return new Result({ msg: '游客登录成功', result: {...respone, token} }).Return()
    }
  }
  
}