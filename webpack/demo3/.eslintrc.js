module.exports = {
  root: true,   //  eslint找到这个标识后，不会再去父文件夹中找eslint的配置文件
  // parser: 'babel-eslint',   //使用babel-eslint来作为eslint的解析器
  extends: "eslint:recommended",  // 继承eslint-config-recommended里面提供的lint规则
  parserOptions: { // 设置解析器选项
    "sourceType": "module"   // 表明自己的代码是ECMAScript模块
  },
   // 启用额外的规则或者覆盖基础配置中的规则的默认选项
  rules: {
    "linebreak-style": [
      "warn",
      "windows"
    ],
    'indent': [ 'error', 2 ],
    "quotes": [
      "error",
      "single"
    ],
    "semi": [
      "error",
      "always"
    ]
  },
  // 声明在代码中自定义的全局变量
  globals: {
    "window": true, //代码中可用 window document  console 对象
    "document": true,
    "console": true
  },
  // 定义预定义的全局变量
  env: {
    browser: true //你在代码中可以放心使用宿主环境给你提供的全局变量。
  }
};