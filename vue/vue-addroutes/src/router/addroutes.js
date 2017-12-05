exports.menus = [{
  path: '/',
  name: '首页',
  component: (resolve) => require(['../views/index.vue'], resolve),
  children: [{
    path: '/menus',
    name: '菜单管理',
    component: (resolve) => require(['../views/menus.vue'], resolve)
  }, {
    path: '/resources',
    name: '资源管理',
    component: (resolve) => require(['../views/resources.vue'], resolve)
  }]
}]