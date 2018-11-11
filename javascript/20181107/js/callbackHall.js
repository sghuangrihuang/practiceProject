// funcHall1

// let funcHall = str => new Promise((resolve, reject) => {
//     setTimeout(() => {
//         console.log(str)
//         if (str && str.length % 2) {
//             resolve(`resolve信息：${str}`)
//         } else {
//             reject(`reject 信息：${str}`)
//         }
//     }, 1000/60)
// })

// funcHall('hello')
//     .then(str => {
//         console.log(str)
//         return funcHall('ghost')
//     })
//     .then(str => {
//         console.log(str)
//         return funcHall('chose')
//     })
//     .then(str => {
//         console.log(str)
//         return funcHall('iseror')
//     })
//     .then(str => {
//         console.log(str)
//     })
//     .catch(err => {
//         console.log(err)
//     })



// let awaitFunc = async function () {
//     try {
//         let aw1 = await await1()
//         let aw2 = await await2()
//         let aw3 = await await3()
//     } catch (error) {
//         console.log(JSON.stringify(error));
//     }

// }

// let await1 = function () {
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             console.log('await1')
//             resolve('await1')
//         }, 2000)
//     })
// }

// let await2 = function () {
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             console.log('await2')
//             reject('error: await2')
//         }, 1000)
//     })
// }

// let await3 = function () {
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             console.log('await3')
//             resolve('await3')
//         }, 1500)
//     })
// }

// awaitFunc()


// const sleep = time => new Promise((resolve, reject) => {
//     let timesamp = + new Date()
//     setTimeout(() => {
//         if (timesamp % 2) {
//             resolve(timesamp)
//         } else {
//             reject(timesamp)
//         }
//     }, time)
// })

// let startTime = (async () => {
//     try {
//         for (var i = 1; i <= 10; i++) {
//             console.log(`当前第${i}秒次发送`);
//             await sleep(1000)
//         }
//     } catch (error) {
//         console.log(JSON.stringify(error))
//     }
// })()
