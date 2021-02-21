<template>
  <div>
    <el-dialog
      :visible.sync="info.isShow"
      width="50%"
      @close="reset">
      
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="上级分类">
          <el-select v-model="form.pid" placeholder="请选择上级菜单">
            <el-option label="顶级菜单" :value="0"></el-option>
            <el-option v-for="item in list" :key="item.id" :label="item.catename" :value="item.id"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="分类名称">
          <el-input v-model="form.catename"></el-input>
        </el-form-item>

        <el-form-item label="图片">
          <div class="imgBox">
            <input type="file" @change="changeInp" v-if="info.isShow">
            <div class="add">+</div>
            <img :src="imgUrl" v-if="imgUrl">
          </div>
        </el-form-item>

        <el-form-item label="状态">
          <el-switch v-model="form.status" :active-value="1" :inactive-value="2"></el-switch>
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
import { cateAdd,cateInfo,cateEdit } from "../../../utils/request.js"
// 引入辅助函数，为了操作仓库数据
import { mapGetters,mapActions } from "vuex"

export default {
  props: ["info"],
  data() {
    return {
      form: {
        pid: 0,
        catename: "",
        img: "",
        status: 1
      },
      iconArr: ["el-icon-eleme", "el-icon-setting", "el-icon-more-outline", "el-icon-star-off", "el-icon-goods"],
      routerArr: routerArr,
      imgUrl: ""
    };
  },
  computed: {
    ...mapGetters({
      list: "cate/list"
    })
  },
  methods: {
    ...mapActions({
      reqChangeList: "cate/reqChangeList"
    }),
    reset() {
      this.form = {
        pid: 0,
        catename: "",
        img: "",
        status: 1
      },
      this.imgUrl = ""
    },
    cancel() {
      this.info.isShow = false;
      this.reset();
    },
    submit() {
      cateAdd(this.form).then( res => {
        console.log(this.form)
        if( res.data.code == 200 ) {
          successAlert(res.data.msg)
          this.cancel()
          this.reqChangeList()
        }else{
          warningAlert(res.data.msg)
        }
      })
    },
    getOne(id) {
      cateInfo(id).then( res => {
        console.log(res);
        if( res.data.code == 200 ) {
          this.form = res.data.list;
          this.imgUrl = this.$imgUrl + this.form.img
          this.form.id = id;
        }else {
          warningAlert( res.data.msg )
        }
      })
    },
    edit() {
      cateEdit(this.form).then( res => {
        if( res.data.code == 200 ){
          successAlert( res.data.msg )
          this.cancel()
          this.reqChangeList()
        }else {
          warningAlert( res.data.msg )
        }
      })
    },
    changeInp(e) {
      let files = e.target.files[0];
      if( files ) {
        this.imgUrl = URL.createObjectURL(files);
      }
      this.form.img = files;
    }
  }
};
</script>

<style scoped>
  .imgBox {
    position: relative;
    width: 200px;
    height: 200px;
    overflow: hidden;
    border: 1px dashed #333;
    border-radius: 4px;
  }
  .imgBox input {
    position: absolute;
    top: 0;
    left: 0;
    width: 200px;
    height: 200px;
    opacity: 0;
    z-index: 2;
  }
  .imgBox .add {
    position: absolute;
    top: 0;
    left: 0;
    width: 200px;
    height: 200px;
    font-size: 60px;
    line-height: 200px;
    text-align: center;
  }
  .imgBox img {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
  }
</style>