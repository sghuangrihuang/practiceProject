// Async - 定义异步函数(async function someName(){...})

//   自动把函数转换为 Promise
//   当调用异步函数时，函数返回值会被 resolve 处理
//   异步函数内部可以使用 await

// Await - 暂停异步函数的执行 (var result = await someAsyncCall();)

//   当使用在 Promise 前面时，await 等待 Promise 完成，并返回 Promise 的结果
//   await 只能和 Promise 一起使用，不能和 callback 一起使用
//   await 只能用在 async 函数中

const getJson = () => {
  return new Promise((resolve, reject) => {
    let random = Math.floor(Math.random(0, 1) * 10 + 1 );
    if ( random % 2 == 0 ) {
      resolve({
        status: 0,
        result: true
      });
    } else {
      reject('error');
    }
  })
}

// 传统promise写法
// const makeRequest = () => {
//   getJson().then(data => {
//     console.log(data);
//     return 'done';
//   });
// }

// makeRequest();

// async表示函数里有异步操作，await表示紧跟在后面的表达式需要等待结果

// async语法
// const makeRequest = async () => {
//   console.log(await getJson);
//   return 'done'
// }

// makeRequest().then(val => {
//   console.log(val); //done
// });

// 任何一个async函数都会隐式返回一个promise对象，并且promise resolve 的值就是 return 返回的值

// 多步异步操作

// const makeRequest = () => {
//   return promise1()
//   .then(value1 => {
//     // do something
//     return promise2(value1)
//       .then(value2 => {
//         // do something          
//         return promise3(value1, value2)
//       })
//     })
// }

// const makeRequest = async () => {
//   const value1 = await promise1()
//   const value2 = await promise2(value1)
//   return promise3(value1, value2)
// }


// Async / Await 可以使用 try/catch 进行错误处理

// const makeRequest = async () => {
//   try {
//     // this parse may fail
//     const data = JSON.parse(await getJSON())
//     console.log(data)
//   } catch (err) {
//     console.log(err)
//   }
// }

// 多个异步函数同时执行时，需要借助 Promise.all
// const getABC = async () => {
//   let A = await getValueA(); // getValueA 花费 2 秒
//   let B = await getValueB(); // getValueA 花费 4 秒
//   let C = await getValueC(); // getValueA 花费 3 秒
//   9秒
//   return A*B*C;
// }

// const getABC = async () => {
//   // Promise.all() 允许同时执行所有的异步函数
//   let results = await Promise.all([ getValueA, getValueB, getValueC ]); 
//   4秒
//   return results.reduce((total,value) => total * value);
// }

const timeout = async (ms) => {
  await new Promise((resolve, reject) => {
    setTimeout(resolve, ms);
  })
}

const asyncPrint = async (val, ms) => {
  await timeout(ms)
  console.log(val);
}

asyncPrint('hello world', 1000);
