<template>
  <div>
    <el-dialog
      :visible.sync="obj.isShow"
      width="60%"
      :before-close="cancel">

      <!-- 删除  ref="form" -->
      <el-form :model="form" label-width="80px">
        <el-form-item label="手机号">
          <el-input v-model="form.phone"></el-input>
        </el-form-item>
        <el-form-item label="昵称">
          <el-input v-model="form.nickname"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="form.password"></el-input>
        </el-form-item>
        <el-form-item v-if="!obj.isAdd" label="状态">
          <el-switch v-model="form.status" :active-value="1" :inactive-value="2"></el-switch>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button v-if="obj.isAdd" type="primary" @click="register">注 册</el-button>
        <el-button v-else type="primary" @click="edit">编 辑</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { successAlert,warningAlert } from "../../../utils/alert.js"
import {memberRegister,memberInfo,memberEdit} from "../../../utils/request.js"
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
        phone: "",
        nickname: "",
        password: ""
      }
    }
  },
  computed: {
    ...mapGetters({
      list: "member/list"
    })
  },
  methods: {
    ...mapActions({
      reqChangeList: "member/reqChangeList"
    }),
    reset() {
      this.form = {
        phone: "",
        nickname: "",
        password: ""
      }
    },
    cancel() {
      this.reset()
      this.obj.isShow = false;
    },
    register() {
      memberRegister(this.form).then( res=> {
        if(res.data.code == 200) {
          successAlert(res.data.msg)
          this.cancel()
          this.reqChangeList()
        }else {
          warningAlert(res.data.msg)
        }
      })
    },
    getOne(uid) {
      memberInfo(uid).then(res => {
        if(res.data.code == 200) {
          this.form = res.data.list
          this.form.password = ""
        }else {
          warningAlert(res.data.msg)
        }
      })
    },
    edit() {
      console.log(this.form);
      memberEdit(this.form).then(res => {
        console.log(res);
      })
    }
  },
  mounted() {
    this.obj = this.info
  }
}
</script>

<style>

</style>