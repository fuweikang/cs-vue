<template>
  <div>
    <el-dialog
      :title="info.isAdd==true?'菜单添加':'菜单编辑'"
      :visible.sync="info.isShow"
      width="50%"
      @close="reset">
      
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="菜单名称">
          <el-input v-model="form.title"></el-input>
        </el-form-item>

        <el-form-item label="上级菜单">
          <el-select v-model="form.pid" @change="changePid" placeholder="请选择上级菜单">
            <el-option label="顶级菜单" :value="0"></el-option>
            <el-option v-for="item in list" :key="item.id" :label="item.title" :value="item.id"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="菜单类型">
          <el-radio-group v-model="form.type">
            <el-radio :label="1" disabled>目录</el-radio>
            <el-radio :label="2" disabled>菜单</el-radio>
          </el-radio-group>
        </el-form-item>
        
        <el-form-item v-if="form.type == 1" label="菜单图标">
          <el-select v-model="form.icon">
            <el-option v-for="item in iconArr" :key="item" :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item v-else label="菜单地址">
          <el-select v-model="form.url">
            <el-option v-for="item in routerArr" :key="item.path" :label="item.path" :value="'/'+item.path"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="状态">
          <el-switch v-model="form.status" active-value="1" inactive-value="2"></el-switch>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="submit" v-if="info.isAdd">添 加</el-button>
        <el-button type="primary" @click="edit" v-else>编 辑</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
// 引入弹窗二次封装
import { successAlert,warningAlert } from "../../../utils/alert"
// 引入路由信息，为添加/修改-菜单地址提供数据
import { routerArr } from "../../../router/index.js"
// 引入接口数据
import { menuAdd,menuInfo,menuEdit } from "../../../utils/request"
// 引入辅助函数，为了操作仓库数据
import { mapGetters,mapActions } from "vuex"

export default {
  props: ["info"],
  data() {
    return {
      form: {
        pid: 0,
        title: "",
        icon: "",
        type: 1,
        url: "",
        status: 1
      },
      iconArr: ["el-icon-eleme", "el-icon-setting", "el-icon-shopping-bag-1", "el-icon-star-off", "el-icon-goods"],
      routerArr: routerArr
    };
  },
  computed: {
    ...mapGetters({
      list: "menu/list"
    })
  },
  methods: {
    ...mapActions({
      reqChangeList: "menu/reqChangeList"
    }),
    reset() {
      this.form = {
        pid: 0,
        title: "",
        icon: "",
        type: 1,
        url: "",
        status: 1
      }
    },
    cancel() {
      this.info.isShow = false;
      this.reset();
    },
    submit() {
      console.log(this.form)
      menuAdd(this.form).then( res => {
        if( res.data.code == 200 ) {
          successAlert(res.data.msg)
          this.cancel()
          this.reqChangeList()
        }else{
          warningAlert(res.data.msg)
        }
      })
    },
    changePid() {
      if( this.form.pid == 0 ) {
        this.form.type = 1;
        this.form.url = "";
      }else {
        this.form.type = 2;
        this.form.icon = "";
      }
    },
    getOne(id) {
      menuInfo(id).then( res => {
        if( res.data.code == 200 ) {
          this.form = res.data.list;
          this.form.id = id;
        }else {
          warningAlert( res.data.msg )
        }
      })
    },
    edit() {
      menuEdit(this.form).then( res => {
        if( res.data.code == 200 ){
          successAlert( res.data.msg )
          this.cancel()
          this.reqChangeList()
        }else {
          warningAlert( res.data.msg )
        }
      })
    }
  }
};
</script>

<style>

</style>