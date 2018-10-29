/**
 * Created by chao
 */

interface IResultData {
  result: any
}

export default class Result {
  
  public result: any;
  
  constructor(result: any) {
    this.result = result;
  }
  
  public Return () {
    const response = {
      code: this.result ? 200 : 201,
      msg: this.result ? '成功' : '失败',
      result: this.result || null
    }
    return response;
  }
  
}