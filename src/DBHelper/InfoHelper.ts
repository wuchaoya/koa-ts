/**
 * Created by chao
 */
import Models from '../models';

const { Info, Resume } = Models;

export default class InfoHelper {
  
  public static findInfo = async () => await Info.find({})
  
  public static findResume = async () => {
    const repones = await Resume.find({})
    return repones;
  }
  
}