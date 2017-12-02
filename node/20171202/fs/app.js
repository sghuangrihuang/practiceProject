const fs = require('fs')

// fs.readFile('./input.txt', (err, data) => {
//   if (err) {
//     return console.error(err);
//   }
//   console.log(`异步读取：${data.toString()}`);
// })
var data = {
  a: 1,
  b: 2
}
console.log("准备写入文件");


// fs.writeFile(file, data[, options], callback) 
// 如果文件存在，该方法写入的内容会覆盖旧的文件内容

fs.writeFile('./data.json', JSON.stringify(data),  function(err) {
  if (err) {
    return console.error(err);
  }
  console.log("数据写入成功！");
});