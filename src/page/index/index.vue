<template>
  <div>
    <el-container class="wrap">
      <!-- 左侧 -->
      <el-aside width="200px">
        <el-col :span="24">
          <el-menu
            default-active="1"
            class="el-menu-vertical-demo"
            background-color="#20222a"
            text-color="#fff"
            active-text-color="#ffd04b"
            :unique-opened="true"
            router>

            <el-menu-item index="/">
              <i class="el-icon-s-home"></i>
              <span slot="title">首页</span>
            </el-menu-item>



            <el-submenu index="2" v-if="arr1.length">
              <template slot="title">
                <i class="el-icon-setting"></i>
                <span>系统设置</span>
              </template>
              <el-menu-item-group>
                <el-menu-item v-for="(item,index) in arr1" :key="index" :index="item.url">{{item.title}}</el-menu-item>
              </el-menu-item-group>
            </el-submenu> 

            <el-submenu index="3" v-if="arr2.length">
              <template slot="title">
                <i class="el-icon-shopping-bag-1"></i>
                <span>商城管理</span>
              </template>
              <el-menu-item-group>
                <el-menu-item v-for="(item,index) in arr2" :key="index" :index="item.url">{{item.title}}</el-menu-item>
              </el-menu-item-group> 




            <!-- <el-submenu index="2">
              <template slot="title">
                <i class="el-icon-setting"></i>
                <span>系统设置</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="/menu">菜单管理</el-menu-item>
                <el-menu-item index="/role">角色管理</el-menu-item>
                <el-menu-item index="/manage">管理员管理</el-menu-item>
              </el-menu-item-group>
            </el-submenu> 

            <el-submenu index="3">
              <template slot="title">
                <i class="el-icon-shopping-bag-1"></i>
                <span>商城管理</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="cate">商品分类</el-menu-item>
                <el-menu-item index="specs">商品规格</el-menu-item>
                <el-menu-item index="goods">商品管理</el-menu-item>
                <el-menu-item index="member">会员管理</el-menu-item>
                <el-menu-item index="banner">轮播图管理</el-menu-item>
                <el-menu-item index="seckill">秒杀活动</el-menu-item>
              </el-menu-item-group>  -->

            </el-submenu>
          </el-menu>
        </el-col>
      </el-aside>
      <el-container>
        <!-- 上侧 -->
        <el-header class="topNav">
          <p class="topP">{{userInfo.username}}</p>
          <el-button @click="exit">退出</el-button>
        </el-header>
        <!-- 主体 -->
        <el-main>
          <el-breadcrumb separator-class="el-icon-arrow-right" class="topBar">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>{{ $route.name }}</el-breadcrumb-item>
          </el-breadcrumb>
          <!-- 二级路由出口 -->
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex"
export default {
  data() {
    return {
      arr1 : [],
      arr2 : []
    }
  },
  methods: {
    ...mapActions({
      reqChangeUserInfo: "reqChangeUserInfo"
    }),
    exit() {
      this.reqChangeUserInfo({});
      this.$router.push("/login")
    }
  },
  computed: {
    ...mapGetters({
      userInfo: "userInfo"
    })
  },
  mounted() {
    //  只要有二级菜单，无论是几个都把一级菜单渲染出来
    for (let i=0; i<this.userInfo.menus.length; i++) {
      if (this.userInfo.menus[i].children) {
        if (this.userInfo.menus[i].id==1) {
          this.arr1 = this.userInfo.menus[i].children;
        }else {
          this.arr2 = this.userInfo.menus[i].children;
        }
      }else {
        if (this.userInfo.menus[i].pid==1) {
          this.arr1.push(this.userInfo.menus[i])
        }else {
          this.arr2.push(this.userInfo.menus[i])
        }
      }
    }
  }
}
</script>

<style>
  .el-header, .el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }
  
  .el-aside {
    background-color: #20222a;
    color: #fff;
  }
  
  .el-main {
    background-color: #fff;
    color: #333;
  }
  
  body > .el-container {
    margin-bottom: 40px;
  }
  
  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }
  
  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }

  .wrap {
    width: 100vw;
    height: 100vh;
  }

  .topBar {
    margin-bottom: 20px;
  }
  .topNav {
    display: flex;
  }
  .topP {
    flex: 1;
  }
</style>