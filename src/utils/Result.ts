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
    if (this.type(this.result) === 'object') {
      return Object.assign(
        Object.keys(this.result).indexOf('code') === -1 ?{code: 200} : {},
        this.result,
        Object.keys(this.result).indexOf('result') === -1 ?{result: null} : {})
    }
    const response = {
      code: this.result ? 200 : 204,
      msg:'成功',
      result: this.result || null
    }
    return response;
  }
  
  /**
   *
   * @param parameter
   * null、string、boolean、number、undefined、array、function、object、date、math
   */
  public type (parameter: any) {
    return Object.prototype.toString.call(parameter).match(/ (\w+)/)[2]
  }
  
}