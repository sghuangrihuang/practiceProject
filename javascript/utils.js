/*
* @Author: sghuangrihuang
* @Date:   2017-05-22 09:11:30
* @Last Modified by:   sghuangrihuang
* @Last Modified time: 2018-11-10 16:16:38
*/

// 保存数据到本地
function saveToLocal(id, key, value) {
  var obj = window.localStorage.__store__
  if (!obj) {
    obj = {}
    obj[id] = {}
    obj[id][key] = value
  } else {
    obj = JSON.parse(obj)
    if (!obj[id]) {
      obj[id] = {}
    }
  }
  obj[id][key] = value
  window.localStorage.__store__ = JSON.stringify(obj)
}

// 读取本地数据
function loadFromLocal(id, key, def = '') {
  var obj = window.localStorage.__store__
  if (!obj) {
    return def
  }
  obj = JSON.parse(obj)[id]
  if (!obj) {
    return def
  }
  var ret = obj[key]
  return ret || def
}

/**
 * 删除本地数据
 */
function removeLocal() {
  window.localStorage.removeItem('__store__');
}

/**
 * 格式化日期
 * 
 * @param { Date } date 时间戳
 * @param { String } pattern 格式化指数
 * @return { Sting } 返回转化后的日期格式
 */
function formatDate(date = new Date(), pattern = "yyyy-MM-dd hh:mm:ss") {
  var o = {
    "M+": date.getMonth() + 1,
    "d+": date.getDate(),
    "h+": date.getHours(),
    "m+": date.getMinutes(),
    "s+": date.getSeconds(),
    "q+": Math.floor((date.getMonth() + 3) / 3),
    "S": date.getMilliseconds()
  };
  if (/(y+)/.test(pattern)) {
    pattern = pattern.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
  }

  for (var k in o) {
    if (new RegExp("(" + k + ")").test(pattern)) {
      pattern = pattern.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
    }
  }
  return pattern;
}

/**
 * 将参数格式化为查询字符串。
 * 
 * @param { String } queryName 参数名
 * @param { any }  value 参数值
 * @return { string[] }
 */
function formatParams(queryName, value) {
  queryName = queryName.replace(/=/g, '')
  var result = []

  switch (value.constructor) {
    case String:
    case Number:
    case Boolean:
      result.push(encodeURIComponent(queryName) + '=' + encodeURIComponent(value))
      break

    case Array:
      value.forEach(function (item) {
        result = result.concat(formatParams(queryName + '[]=', item))
      })
      break

    case Object:
      Object.keys(value).forEach(function (key) {
        var item = value[key]
        result = result.concat(formatParams(queryName + '[' + key + ']', item))
      })
      break
  }

  return result
}

/**
 * Flat querys.
 *
 * @param { Array } array 
 * @returns
 */
function flatten(array) {
  var querys = []
  array.forEach(function (item) {
    if (typeof item === 'string') {
      querys.push(item)
    } else {
      querys = querys.concat(flatten(item))
    }
  })
  return querys
}

/**
 *  
 * @param { Object } params json请求参数
 */
function formatQueryStr(params) {
  var queryStrs = []
  Object.keys(params).forEach(function (queryName) {
    queryStrs = queryStrs.concat(formatParams(queryName, params[queryName]))
  })

  var queryStr = flatten(queryStrs).join('&')

  return queryStr
}

function formatUrl(url, params) {
  return url + (/\?/.test(url) ? '&' : '?') + formatQueryStr(params)
}

function encryptPhone(val) {
  return val.replace(/(\\d{3})(\\d{4})(\\d{4})/, "$1****$3")
}


/**
 * Generate random string.
 * @return { String }
 */
function randomStr() {
  return (Math.floor(Math.random() * 100000) * Date.now()).toString(16)
}

/**
 * JSONP function.
 * @param { String } url Target URL address.
 * @param { Object } params Querying params object.
 * @param { Number } timeout Timeout setting (ms).
 *
 * @example
 *   jsonp('/url', {
 *     callbackQuery: ''
 *     callbackName: '',
 *     name: 'sghuangrihuang',
 *     age: 23
 *   }, 1000)
 */
function jsonp(url, params, timeout) {
  params = params || {}
  timeout = timeout || 1000

  return new Promise(function (resolve, reject) {
    if (typeof url != 'string') {
      throw new Error('[jsonp] Type of param "url" is no string.');
    }

    var callbackQuery = params.callbackQuery || 'callback'
    var callbackName = params.callbackName || 'jsonp_' + randomStr()

    params[callbackQuery] = callbackName

    delete params.callbackQuery
    delete params.callbackName

    window[callbackName] = function (json) {
      clearTimeout(timeoutTimer)
      removeErrorListener()
      headNode.removeChild(queryScript)
      resolve(json)
      delete window[callbackName]
    }

    var timeoutTimer = null

    if (typeof timeout === 'number') {
      timeoutTimer = setTimeout(function () {
        removeErrorListener()
        headNode.removeChild(queryScript)
        delete window[callbackName]
        reject({ statusText: 'Request Timeout', status: 408 })
      }, timeout)
    }

    var headNode = document.querySelector('head')
    var queryScript = document.createElement('script')

    queryScript.addEventListener('error', onError)

    queryScript.type = "text/javascript"
    queryScript.src = formatUrl(url, params)
    headNode.appendChild(queryScript)

    function onError() {
      removeErrorListener()
      clearTimeout(timeoutTimer)
      reject({
        status: 400,
        statusText: 'Bad Request'
      })
    }

    function removeErrorListener() {
      queryScript.removeEventListener('error', onError)
    }

  })
}
