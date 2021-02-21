import Vue from 'vue'
import Router from 'vue-router'
import store from '../store/index.js'

Vue.use(Router)

function changeEnter(path,next) {
  let routerUrl = store.state.userInfo.menus_url
  if( routerUrl.includes(path) ) {
    next()
  }else {
    next("/")
  }
}

export const routerArr = [{
  path: "menu",
  name: "菜单管理",
  component: () => import("../page/menu/menu.vue"),
  beforeEnter: (to, from, next) => {
    changeEnter("/menu",next)
  }
},
{
  path: "role",
  name: "角色管理",
  component: () => import("../page/role/role.vue"),
  beforeEnter: (to, from, next) => {
    changeEnter("/role",next)
  }
},
{
  path: "manage",
  name: "管理员管理",
  component: () => import("../page/manage/manage.vue"),
  beforeEnter: (to, from, next) => {
    changeEnter("/manage",next)
  }
},
{
  path: "cate",
  name: "商品分类",
  component: () => import("../page/cate/cate.vue"),
  beforeEnter: (to, from, next) => {
    changeEnter("/cate",next)
  }
},
{
  path: "specs",
  name: "商品规格",
  component: () => import("../page/specs/specs.vue"),
  beforeEnter: (to, from, next) => {
    changeEnter("/specs",next)
  }
},
{
  path: "goods",
  name: "商品管理",
  component: () => import("../page/goods/goods.vue"),
  beforeEnter: (to, from, next) => {
    changeEnter("/goods",next)
  }
},
{
  path: "member",
  name: "会员管理",
  component: () => import("../page/member/member.vue"),
  beforeEnter: (to, from, next) => {
    changeEnter("/member",next)
  }
},
{
  path: "banner",
  name: "轮播图管理",
  component: () => import("../page/banner/banner.vue"),
  beforeEnter: (to, from, next) => {
    changeEnter("/banner",next)
  }
},
{
  path: "seckill",
  name: "秒杀活动",
  component: () => import("../page/seckill/seckill.vue"),
  beforeEnter: (to, from, next) => {
    changeEnter("/seckill",next)
  }
}]

const route = new Router({
  routes: [
    {
      path: "/login",
      component: () => import("../page/login/login.vue")
    },
    {
      path: "/",
      component: () => import("../page/index/index.vue"),
      children: [
        {
          path: "",
          component: () => import("../page/home/home.vue")
        },
        ...routerArr
      ]
    }
  ]
})

route.beforeEach((to, from, next) => {
  if( to.path == "/login") {
    next()
    return
  }
  if( store.state.userInfo.token ) {
    next()
    return
  }
  next("/login")
})

export default route