let http = require('http')

http.get('http://nodejs.org/dist/index.json', (res) => {
  let data = '';
  res.on('data', (chunk) => {
    data += chunk
  })
  res.on('end', () => {
    let result = JSON.parse(data)
    console.log(result);
  })
  
})