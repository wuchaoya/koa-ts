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
      return { message: '用户名错误', type: 'error' }
    } else if (user.password !== respone.password) {
      return { message: '密码错误', type: 'error' }
    } else if (respone.userName === admin) {
      const {userName, _id } = respone;
      const token = jwt.sign({_id}, admin);
      return {
        message: '欢迎回来，亲爱的超级管理员',
        user: { userName, _id, token },
      }
    } else {
      const {userName, _id } = respone;
      const token = jwt.sign({_id}, guest);
      return {
        message: '登陆成功,您现在是游客',
        user: { userName, _id, token },
      }
    }
  }
  
}