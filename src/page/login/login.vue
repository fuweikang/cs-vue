<template>
  <div>
    <div class="wrap">
      <div class="box">
        <h2>登录</h2>
        <el-input v-model="form.username" clearable class="ipt"></el-input>
        <el-input v-model="form.password" show-password class="ipt"></el-input>
        <el-button type="primary" class="ipt" @click="login">登录</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { successAlert,warningAlert } from "../../utils/alert.js"
import { login } from "../../utils/request.js"
import { mapGetters,mapActions } from "vuex"
export default {
  data() {
    return {
      form: {
        username: "",
        password: ""
      }
    }
  },
  computed: {
    ...mapGetters({
      userInfo: "userInfo"
    })
  },
  methods: {
    ...mapActions({
      reqChangeUserInfo : "reqChangeUserInfo"
    }),
    login() {
      login(this.form).then(res => {
        if (res.data.code == 200) {
          successAlert(res.data.msg)
          this.reqChangeUserInfo(res.data.list)
          this.$router.push("/")
        }else {
          warningAlert(res.data.msg)
        }
      })
    }
  }
}
</script>

<style scoped>
  .wrap {
    position: relative;
    width: 100vw;
    height: 100vh;
    background: linear-gradient( to right, #563545,#303d60 )
  }
  .box {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate( -50%, -50% );
    width: 440px;
    height: 260px;
    background: #fff;
    text-align: center;
    border-radius: 20px;
  }
  .ipt {
    width: 400px;
    margin-bottom: 20px;
  }
</style>