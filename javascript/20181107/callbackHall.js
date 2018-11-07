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

let awaitFunc = async function () {
    let aw1 = await await1()
    let aw2 = await await2()
    let aw3 = await await3()
}

let await1 = function () {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('await1')
            resolve('await1')
        }, 2000)
    })
}

let await2 = function () {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('await2')
            resolve('await2')
        }, 1000)
    })
}

let await3 = function () {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('await3')
            resolve('await3')
        }, 1500)
    })
}

awaitFunc()
