let checkLogin = () => {
  // 返回 Promise 实例
  return new Promise((resolve, reject) => {
    var flag =  document.cookie.indexOf('userId') > -1 ? true : false;
     if (flag = true) {
       resolve({
         status: 0,
         result: true
       })
     } else {
      reject("error");
     }
  } )
}

let getUserInfo = () => {
  return new Promise((resolve, reject) => {
    let userInfo = {
      "userId": "101"
    }
    resolve(userInfo)
  })
}

checkLogin().then((res) => {
  // checkLogin resolve
  if (res.status == 0) {
    console.log("login success");
    return getUserInfo()
  }
}).catch((err) => {
  // checkLogin reject
  console.log(`errorMess: ${err}`);
}).then((res2) => {
  // getUserInfo resolve
  console.log(`userId:${res2.userId}`);
})

// Promise.all(PromiseArr)方法用于将多个 Promise 实例，包装成一个新的 Promise 实例。
// 只有这几个实例状态变为fulfilled(resolve) 或者其中一个变为rejected 才会调用 Promise.all后面的回调
Promise.all([checkLogin(), getUserInfo()]).then(([res1, res2]) => {
  console.log( `result1:${res1.result}, result2:${res2.userId} `);
  // console.log(res);
});
