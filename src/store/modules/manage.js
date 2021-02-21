import { manageList,manageAll } from "../../utils/request.js"



const state = {
  list: [],
  // 总条数
  total: 0,
  // 每页展示数（固定，想修改时在此处修改即可）
  size: 5,
  // 当前页码数（随着翻页进行变化）
  page:1
}

const mutations = {
  changeList(state,arr) {
    state.list = arr
  },
  changeTotal(state,num) {
    state.total = num
  },
  changePage(state,num) {
    state.page = num
  }
}

const actions = {
  reqChangeList(context) {
    manageList({size:context.state.size,page:context.state.page}).then( res => {
      let list = res.data.list?res.data.list:[]
      context.commit("changeList",list)
      if( res.data.list == null && context.state.page > 1 ) {
        context.commit("changePage",context.state.page-1)
        context.dispatch("reqChangeList")
        return
      }
      
      context.commit("changeList",res.data.list)
      // console.log(res.data.list);
    })
  },
  reqChangeTotal(context) {
    manageAll().then( res => {
      context.commit("changeTotal",res.data.list[0].total)
    })
    
  },
  reqChangePage(context,num) {
    context.commit("changePage",num)
    context.dispatch("reqChangeList")
  }
}

const getters = {
  list(state) {
    return state.list
  },
  total(state) {
    return state.total
  },
  size(state) {
    return state.size
  },
  page(state) {
    return state.page
  }
}

export default {
  state,
  mutations,
  actions,
  getters,
  namespaced: true
}