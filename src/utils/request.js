import axios from "axios"
import qs from "qs"
import Vue from "vue"
import Store from "../store/index.js"

// 开发环境
let baseUrl = "/api"
Vue.prototype.$imgUrl = "http://localhost:3000"
// 生产环境
// let baseUrl = ""
// Vue.prototype.$imgUrl = ""

axios.interceptors.response.use( res => {
  console.group("====响应拦截====");
  console.log(res);
  console.groupEnd("====拦截结束====");
  return res;
})

axios.interceptors.request.use( config=> {
  if(config.url != baseUrl + "/api/userlogin") {
    config.headers.authorization = Store.state.userInfo.token;
  }
  return config;
})

// ---------------------- menu start ----------------------
// 添加
export const menuAdd = ( form ) => {
  return axios({
    url: baseUrl + "/api/menuadd",
    method: "post",
    data: qs.stringify( form )
  })
}
// 列表
export const menuList = () => {
  return axios({
    url: baseUrl + "/api/menulist",
    method: "get",
    params: { istree: true }
  })
}
// 删除
export const menuDel = (id) => {
  return axios({
    url: baseUrl + "/api/menudelete",
    method: "post",
    data : qs.stringify({ id : id })
  })
}

// 获取一条
export const menuInfo = (id) => {
  return axios({
    url: baseUrl + "/api/menuinfo",
    method: "get",
    params: { id : id }
  })
}

// 菜单编辑
export const menuEdit = (form) => {
  return axios({
    url: baseUrl + "/api/menuedit",
    method: "post",
    data: qs.stringify( form )
  })
}
// ---------------------- menu end ----------------------

// ---------------------- role start ----------------------
// 添加
export const roleAdd = ( form ) => {
  return axios({
    url: baseUrl + "/api/roleadd",
    method: "post",
    data: qs.stringify( form )
  })
}
// 列表
export const roleList = () => {
  return axios({
    url: baseUrl + "/api/rolelist",
    method: "get"
  })
}
// 获取一条
export const roleInfo = (id) => {
  return axios({
    url: baseUrl + "/api/roleinfo",
    method: "get",
    params: {id:id}
  })
}
// 角色编辑
export const roleEdit = ( form ) => {
  return axios({
    url: baseUrl + "/api/roleedit",
    method: "post",
    data: qs.stringify( form )
  })
}
// 角色删除
export const roleDel = (id) => {
  return axios({
    url: baseUrl + "/api/roledelete",
    method: "post",
    data: qs.stringify( { id : id } )
  })
}
// ---------------------- role end ----------------------

// ---------------------- manage start ----------------------
// 管理员添加
export const manageAdd = ( form ) => {
  return axios({
    url: baseUrl + "/api/useradd",
    method: "post",
    data: qs.stringify( form )
  })
}
// 管理员列表
export const manageList = ( form ) => {
  return axios({
    url: baseUrl + "/api/userlist",
    method: "get",
    params: form
  })
}
// 获取一条
export const manageInfo = ( uid ) => {
  return axios({
    url: baseUrl + "/api/userinfo",
    method: "get",
    params: { uid : uid }
  })
}
// 管理员编辑
export const manageEdit = ( form ) => {
  return axios({
    url: baseUrl + "/api/useredit",
    method: "post",
    data: qs.stringify(form)
  })
}
// 管理员删除
export const manageDel = (uid) => {
  return axios({
    url: baseUrl + "/api/userdelete",
    method: "post",
    data: qs.stringify({uid:uid})
  })
}
// 管理员总数
export const manageAll = () => {
  return axios({
    url: baseUrl + "/api/usercount",
    method: "get"
  })
}
// ---------------------- manage end ----------------------

// ---------------------- cate start ----------------------
// 添加
export const cateAdd = ( form ) => {
  let obj = new FormData();
  for( let i in form ) {
    obj.append(i,form[i])
  }
  return axios({
    url: baseUrl + "/api/cateadd",
    method: "post",
    data: obj
  })
}
// 列表
export const cateList = ( ) => {
  return axios({
    url: baseUrl + "/api/catelist",
    method: "get",
    params: { istree: true }
  })
}
// 删除
export const cateDel = (id) => {
  return axios({
    url: baseUrl + "/api/catedelete",
    method: "post",
    data : qs.stringify({ id : id })
  })
}

// 获取一条
export const cateInfo = (id) => {
  return axios({
    url: baseUrl + "/api/cateinfo",
    method: "get",
    params: { id : id }
  })
}

// 菜单编辑
export const cateEdit = (form) => {
  let obj = new FormData();
  for( let i in form ) {
    obj.append(i,form[i])
  }
  return axios({
    url: baseUrl + "/api/cateedit",
    method: "post",
    data: obj
  })
}
// ---------------------- cate end ----------------------

// ---------------------- specs start ----------------------
// 商品规格添加
export const specsAdd = ( form ) => {
  return axios({
    url: baseUrl + "/api/specsadd",
    method: "post",
    data: qs.stringify( form )
  })
}
// 商品规格列表
export const specsList = ( form ) => {
  return axios({
    url: baseUrl + "/api/specslist",
    method: "get",
    params: form
  })
}
// 获取一条
export const specsInfo = ( id ) => {
  return axios({
    url: baseUrl + "/api/specsinfo",
    method: "get",
    params: { id : id }
  })
}
// 商品规格编辑
export const specsEdit = ( form ) => {
  return axios({
    url: baseUrl + "/api/specsedit",
    method: "post",
    data: qs.stringify(form)
  })
}
// 商品规格删除
export const specsDel = (id) => {
  return axios({
    url: baseUrl + "/api/specsdelete",
    method: "post",
    data: qs.stringify({id:id})
  })
}
// 商品规格总数
export const specsAll = () => {
  return axios({
    url: baseUrl + "/api/specscount",
    method: "get"
  })
}
// ---------------------- specs end ----------------------

// ---------------------- goods start ----------------------
// 商品规格添加
export const goodsAdd = ( form ) => {
  let obj = new FormData();
  for( let i in form ) {
    obj.append(i,form[i])
  }
  return axios({
    url: baseUrl + "/api/goodsadd",
    method: "post",
    data: obj
  })
}
// 商品规格列表
export const goodsList = ( form ) => {
  return axios({
    url: baseUrl + "/api/goodslist",
    method: "get",
    params: form
  })
}
// 获取一条
export const goodsInfo = ( id ) => {
  return axios({
    url: baseUrl + "/api/goodsinfo",
    method: "get",
    params: { id : id }
  })
}
// 商品规格编辑
export const goodsEdit = (form) => {
  let obj = new FormData();
  for( let i in form ) {
    obj.append(i,form[i])
  }
  return axios({
    url: baseUrl + "/api/goodsedit",
    method: "post",
    data: obj
  })
}
// 商品规格删除
export const goodsDel = (id) => {
  return axios({
    url: baseUrl + "/api/goodsdelete",
    method: "post",
    data: qs.stringify({id:id})
  })
}
// 商品规格总数
export const goodsAll = () => {
  return axios({
    url: baseUrl + "/api/goodscount",
    method: "get"
  })
}
// ---------------------- goods end ----------------------





// ---------------------- member start ----------------------
// 会员注册（这是属于前台的，但是如果不写完全没办法展开）
export const memberRegister = (form) => {
  return axios({
    url: baseUrl + "/api/register",
    method: "post",
    data: qs.stringify(form)
  })
}

// 会员列表
export const memberList = () => {
  return axios({
    url: baseUrl + "/api/memberlist",
    method: "get"
  })
}
// 获取一条
export const memberInfo = (uid) => {
  return axios({
    url: baseUrl + "/api/memberinfo",
    method: "get",
    params: {uid: uid}
  })
}
// 会员修改
export const memberEdit = (form) => {
  return axios({
    url: baseUrl + "/api/memberedit",
    method: "post",
    data: qs.stringify(form)
  })
}
// ---------------------- member end ----------------------


// ---------------------- banner start ----------------------
// 轮播图添加
export const bannerAdd = (form) => {
  let obj = new FormData()
  for(let i in form) {
    obj.append(i,form[i])
  }
  return axios({
    url: baseUrl + "/api/banneradd",
    method: "post",
    data: obj
  })
}
// 轮播图列表
export const bannerList = () => {
  return axios({
    url: baseUrl + "/api/bannerlist",
    method: "get"
  })
}
// 轮播图获取（一条）
export const bannerInfo = (id) => {
  return axios({
    url: baseUrl + "/api/bannerinfo",
    method: "get",
    params: {id:id}
  })
}
// 轮播图修改
export const bannerEdit = (form) => {
  let obj = new FormData();
  for(let i in form) {
    obj.append(i,form[i])
  }
  return axios({
    url: baseUrl + "/api/banneredit",
    method: "post",
    data: obj
  })
}
// 轮播图删除
export const bannerDelete = (id) => {
  return axios({
    url: baseUrl + "/api/bannerdelete",
    method: "post",
    data: qs.stringify({id,id})
  })
}
// ---------------------- banner end ----------------------


// ---------------------- seckill start ----------------------
// 秒杀添加
export const seckAdd = (form) => {
  return axios({
    url: baseUrl + "/api/seckadd",
    method: "post",
    data: qs.stringify(form)
  })
}
// 秒杀列表
export const seckList = () => {
  return axios({
    url: baseUrl + "/api/secklist",
    method: "get"
  })
}
// 秒杀获取（一条）
export const seckInfo = (id) => {
  return axios({
    url: baseUrl + "/api/seckinfo",
    method: "get",
    params: {id:id}
  })
}
// 秒杀修改
export const seckEdit = (form) => {
  return axios({
    url: baseUrl + "/api/seckedit",
    method: "post",
    data: qs.stringify(form)
  })
}
// 秒杀删除
export const seckDelete = (id) => {
  return axios({
    url: baseUrl + "/api/seckdelete",
    method: "post",
    data: qs.stringify({id,id})
  })
}
// ---------------------- seckill end ----------------------




































// ---------------------- login start ----------------------
// 登录
export const login = (form) => {
  return axios({
    url: baseUrl + "/api/userlogin",
    method: "post",
    data: qs.stringify(form)
  })
}
// ---------------------- login end ----------------------