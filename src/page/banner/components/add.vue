<template>
  <div>
    <el-dialog
      :visible.sync="obj.isShow"
      width="60%"
      :before-close="cancel">

      <el-form :model="form" label-width="80px">
        <el-form-item label="标题">
          <el-input v-model="form.title"></el-input>
        </el-form-item>
        <el-form-item label="图片">
          <!-- <el-input v-model="form.img"></el-input> -->
          <div class="box">
            <div class="plus">+</div>
            <img v-if="image" :src="image" class="img">
            <!-- 它最后再加个opacity:0就好了。 -->
            <input type="file" class="file" @change="changeInp" v-if="obj.isShow">    
          </div>
        </el-form-item>
        <el-form-item label="状态">
          <el-switch v-model="form.status" :active-value="1" :inactive-value="2"></el-switch>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button v-if="obj.isAdd" type="primary" @click="add">添 加</el-button>
        <el-button v-else type="primary" @click="edit">编 辑</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { successAlert,warningAlert } from "../../../utils/alert.js"
import {bannerAdd,bannerInfo,bannerEdit} from "../../../utils/request.js"
import {mapGetters,mapActions} from "vuex"

export default {
  props:["info"],
  data() {
    return {
      obj: {
        isShow: false,
        isAdd: true
      },
      form: {
        title: "",
        img: "",
        status: 1
      },
      image: ""
    }
  },
  computed: {
    ...mapGetters({
      list: "banner/list"
    })
  },
  methods: {
    ...mapActions({
      reqChangeList: "banner/reqChangeList"
    }),
    changeInp(e) {
      let file = e.target.files[0];
      console.log(file);
      if(file) {
        console.log(1);
        this.form.img = file;
        this.image = URL.createObjectURL(file)
      }else {
        console.log(2);
        this.image = ""
      }
    },
    reset() {
      this.form = {
        title: "",
        img: "",
        status: 1
      }
      this.image = "";
    },
    cancel() {
      this.reset()
      this.obj.isShow = false;
    },
    add() {
      bannerAdd(this.form).then( res => {
        if(res.data.code == 200) {
          successAlert(res.data.msg)
          this.cancel()
          this.reqChangeList()
        }else {
          warningAlert(res.data.msg)
        }
      })
    },
    getOne(id) {
      bannerInfo(id).then(res => {
        if(res.data.code == 200) {
          this.form = res.data.list
          this.form.id = id;
          this.image = this.$imgUrl + this.form.img
        }else {
          warningAlert(res.data.msg)
        }
      })
    },
    edit() {
      bannerEdit(this.form).then(res => {
        if(res.data.code == 200) {
          this.cancel();
          this.reqChangeList();
        }else {
          warningAlert(res.data.msg)
        }
      })
    }
  },
  mounted() {
    this.obj = this.info
  }
}
</script>

<style scoped>
  .box {
    position: relative;
    width: 200px;
    height: 200px;
    overflow: hidden;
    border: 1px dashed #333;
    border-radius: 4px;
  }
  .plus {
    width: 200px;
    height: 200px;
    font-size: 60px;
    text-align: center;
    line-height: 200px;
    color: #8c939d;
    background-color: #fbfdff;
  }
  .file {
    position: absolute;
    top: 0;
    left: 0;
    width: 200px;
    height: 200px;
    opacity: 0;
  }
  .img {
    position: absolute;
    top: 0;
    left: 0;
    width: 200px;
    height: 200px;
  }
</style>