import { goodsList,goodsAll } from "../../utils/request.js"



const state = {
  list: [],
  list1: [],
  // 总条数
  total: 0,
  // 每页展示数（固定，想修改时在此处修改即可）
  size: 2,
  // 当前页码数（随着翻页进行变化）
  page:1
}

const mutations = {
  changeList(state,arr) {
    state.list = arr
  },
  changeList1(state,arr) {
    state.list1 = arr
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
    goodsList({size:context.state.size,page:context.state.page}).then( res => {
      let list = res.data.list?res.data.list:[]
      // context.commit("changeList",list)
      if( list.length == 0 && context.state.page > 1 ) {
        context.commit("changePage",context.state.page-1)
        context.dispatch("reqChangeList")
        return
      }
      context.commit("changeList",list)

      // context.commit("changeList",res.data.list)
      // console.log(res.data.list);
    })
  },
  reqChangeList1(context) {
    goodsList({size:99999,page:1}).then( res => {
      let list = res.data.list?res.data.list:[]
      // context.commit("changeList",list)
      // if( list.length == 0 && context.state.page > 1 ) {
      //   context.commit("changePage",context.state.page-1)
      //   context.dispatch("reqChangeList1")
      //   return
      // }
      context.commit("changeList1",list)

      // context.commit("changeList",res.data.list)
      // console.log(res.data.list);
    })
  },
  reqChangeTotal(context) {
    goodsAll().then( res => {
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
  list1(state) {
    return state.list1
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