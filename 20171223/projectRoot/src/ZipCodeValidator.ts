//导入接口
import { StringValidator } from './Validation';

const numberRegexp = /^[0-9]+$/;

//导出类，形成功能模块
export class ZipCodeValidator implements StringValidator {
  isAcceptable(s: string) {
    return s.length === 5 && numberRegexp.test(s);
  }
}
