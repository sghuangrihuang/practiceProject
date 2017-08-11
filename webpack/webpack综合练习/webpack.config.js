const devModule = require('./config/dev')
const prodModule = require('./config/prod')

let finalModule = {}

let ENV = process.env.NODE_ENV

switch(ENV){
  case 'dev':
    finalModule = devModule
  break;
  case 'prod':
    finalModule = prodModule
  break;
  default:
  break;
}

module.exports = finalModule