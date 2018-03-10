import { isWeb, weexBasePath } from '../config';
// import Vue from 'vue';

const $route = {
  install() {
    const url = weex.config.bundleUrl;
    const query = getQueryData(url);
    const fullPath = getFullPath(url);
    const path = deteleQueryData(fullPath);

    Object.defineProperty(Vue.prototype, "$router", {
      value: {
        push(route) {
          const navigator = weex.requireModule('navigator');
          navigator.push({
            url: route.path + createQuery(route.query),
            animated: 'true'
          });
        },
        back() {
          const navigator = weex.requireModule('navigator');
          if (navigator) {
            navigator.pop();
          }
        }
      },
      configurable: false
    });

    Object.defineProperty(Vue.prototype, '$route', {
      configurable: false,
      value: {
        query: query,
        fullPath: fullPath,
        name: '',
        params: {},
        path: path,
        hash: '',
      }
    });

    Object.assign(Vue.prototype, {
      jump(url) {
        url = getWithHtmlExtUrl(url); // 兼容一下之前路由写法

        // app：访问js文件
        if (!isWeb) {
          if (url.indexOf('.html') !== -1) {
            url = url.replace('.html', '.js');
          }
          url = weexBasePath + url;
        }

        Vue.prototype.$router.push.call(Vue, {
          path: deteleQueryData(url),
          query: getQueryData(url),
        });
      }
    }, {
        back() {
          Vue.prototype.$router.back.call(Vue);
        }
      });

  }
};

function getWithHtmlExtUrl(url) {
  if (url.indexOf('.html') === -1) {
    var sp = url.split('?');
    sp[0] = sp[0] + '.html';
    url = sp.join('?');
  }

  return url;
}

/**
 * 获取fullPath
 * @param url
 * @returns {any}
 */
function getFullPath(url) {
  var fullPath = url.replace(/^((http:\/\/)|(https:\/\/)|(\/\/))?([a-zA-Z0-9]+(\.)?)+(:[a-zA-Z0-9]+)?/, '');
  return fullPath ? fullPath : '/';
}


// object 转 URL 参数
function createQuery(obj) {
  let url = '?';
  for (let key in obj) {
    if (obj[key] !== null) {
      url += (key + '=' + encodeURIComponent(obj[key]) + '&');
    }
  }
  return url.substring(0, url.lastIndexOf('&'));
}

// 'xxx.html?name=aa' 转 {name: 'aa'}
function getQueryData(url) {
  url = url.substring(url.indexOf('?'));
  var result = {};
  if (url.indexOf("?") !== -1) {
    var str = url.substr(1);
    var strs = str.split("&");
    for (var i = 0; i < strs.length; i++) {
      result[strs[i].split("=")[0]] = decodeURIComponent(strs[i].split("=")[1]);
    }
  }
  return result;
}

// 'xxx?name=aa' 转 {name: 'aa'}
function getQueryData2(url) {
  url = url.substring(url.indexOf('?'));
  var result = {};
  if (url.indexOf("?") !== -1 && url !== '?') {
    var str = url.substr(1);
    var strs = str.split("&");
    for (var i = 0; i < strs.length; i++) {
      result[strs[i].split("=")[0]] = decodeURIComponent(strs[i].split("=")[1]);
    }
  }
  return result;
}

// 'xxx?name=aa' 转 'xxx'
function deteleQueryData(url) {
  var index = url.indexOf('?');
  return index !== -1 ? url.substring(0, index) : url;
}

export default $route;