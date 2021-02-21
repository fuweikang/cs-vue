import Vue from 'vue'
import App from './App'
import router from './router'

// 作用：设置默认样式
import "./assets/css/reset.css"
// 作用：存放公共组件
import "./components/index.js"
// 作用：存放全部过滤器
import "./filters/index.js"
// 作用：存放vuex仓库数据
import store from "./store/index.js"
// 作用：Element-UI库
import Element from "element-ui"
import "element-ui/lib/theme-chalk/index.css"
Vue.use(Element)

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})