/*
* @Author: sghuangrihuang
* @Date:   2017-05-22 09:11:30
* @Last Modified by:   sghuangrihuang
* @Last Modified time: 2018-10-14 16:46:38
*/

export function saveToLocal(id, key, value) {
  let obj = window.localStorage.__riProject__
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
  window.localStorage.__riProject__ = JSON.stringify(obj)
}

export function loadFromLocal(id, key, def = '') {
  let obj = window.localStorage.__riProject__
  if (!obj) {
    return def
  }
  obj = JSON.parse(obj)[id]
  if (!obj) {
    return def
  }
  let ret = obj[key]
  return ret || def
}

export function removeLocal() {
  window.localStorage.removeItem('__riProject__');
}

export function formatDate(date = new Date(), pattern = "yyyy-MM-dd hh:mm:ss") {
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

var Util = (function invocation() {
  function Util() {
    this.value = {}
    this.n = 0
    this.addValue.apply(this, arguments)
  }
  Util.prototype.size = function () {
    return this.n;
  }
  Util.prototype.addValue = function () {
  }

  return Util
}())

export function jsonp(_url, params) {

  const defaultOptions = {
    timeout: 5000,
    jsonpCallback: 'callback',
    jsonpCallbackFunction: null
  }

  generateCallbackFunction = () => `jsonp_${Date.now()}_${Math.ceil(Math.random() * 100000)}`

  clearFunction = (functionName) => {
    try {
      delete window[functionName];
    } catch (e) {
      window[functionName] = undefined;
    }
  }

  removeScript = (scriptId) => {
    let srciptDom = document.getElementById(scriptId);
    srciptDom && document.getElementsByTagName('head')[0].removeChild(srciptDom);
  }

  let url = _url, timeoutId

  const timeout = params.timeout || defaultOptions.timeout
  // callback
  const jsonpCallback = params.jsonpCallback || defaultOptions.jsonpCallback

  return new Promise((resolve, reject) => {
    // callbackName
    const callbackFunction = params.jsonpCallbackFunction || generateCallbackFunction()
    const scriptId = `${jsonpCallback}_${callbackFunction}`

    window[callbackFunction] = (response) => {
      resolve({
        ok: true,
        data: () => Promise.resolve(response)
      })

      timeoutId && clearTimeout(timeoutId)

      removeScript(scriptId)

      clearFunction(callbackFunction)

    }
    url += (url.indexOf('?') === -1) ? '?' : '&'

    const jsonScript = document.createElement('script')
    jsonScript.setAttribute('src', `${url}${jsonpCallback}=${callbackFunction}`)
    jsonScript.id = scriptId

    document.getElementsByTagName('head')[0].appendChild(jsonpCallback)

    timeoutId = setTimeout(() => {
      reject(new Error(`JSONP request to ${_url} timed out`))
      
    }, timeout)
  })
}
