#  项目初始结构

## 项目运行

```
  // 安装依赖
  npm install 
  // 运行服务 默认8080端口打开 
  npm run dev
  // 打包文件
  npm run build
  
```

## 项目初始结构分析

通常项目会分成三个运行环境：开发人员在本地跑的开发环境(dev)、测试人员用来做黑盒测试的测试环境(test)和线上运行的生产环境(production)。

简单起见，本文只考虑开发环境(dev)和生产环境(prod)，测试环境可以自行类比。

同时引入一个库webpack-merge用于合并base config和特定环境的config

