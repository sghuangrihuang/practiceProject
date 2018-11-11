import * as utils from './utils'

export function encryptPhone(val) {
  return val.replace(/(\\d{3})(\\d{4})(\\d{4})/, "$1****$3")
}

export function formatYMD (time) {
  return utils.formatDate(time, 'yyyy-MM-dd hh:mm:ss')
}

