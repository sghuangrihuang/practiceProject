# vue项目集合介绍

##  login-vue-project

登陆用户权限进行管理，基本思路是在路由配置加上路由元信息（meta） 作为权限的根据，再根据router-beforeEach提供的导航守卫来对跳转路由地址是否有权限访问。

存在的缺陷：  

0. 本质上将所有的路由全部注册
1. 如果路由不是按需加载的话，会加载大量的冗余代码
2. 每次跳转都要遍历一次完整路由，是对计算能力的浪费

##  vue-addroutes

通过用vue-router 2.2版本提供的router.addRoutes(routes) 实现动态添加路由

更多用户权限控制解决方案
[https://github.com/tower1229/Vue-Access-Control](https://github.com/tower1229/Vue-Access-Control)

##  vue-shop

基于vue2.0+node.js+mongodb全栈打造商城系统

项目情况

- [x] 列表页面基本完成

## Vue problem solution

Vue 解决方案总结