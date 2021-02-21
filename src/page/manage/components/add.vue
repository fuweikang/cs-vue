<template>
  <div>
    <el-dialog :visible.sync="info.isShow" width="50%" @close="cancel">

      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="所属角色">
          <el-select v-model="form.roleid">
            <el-option :value="0" label="请选择" disabled></el-option>
            <el-option v-for="item in manageRoleList" :key="item.id" :label="item.rolename" :value="item.id" ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="用户名">
          <el-input v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="form.password"></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-switch v-model="form.status" :active-value="1" :inactive-value="2"></el-switch>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="add" v-if="info.isArr">添 加</el-button>
        <el-button type="primary" @click="edit" v-else>编 辑</el-button>
      </span>

    </el-dialog>
  </div>
</template>

<script>
import { mapGetters,mapActions } from "vuex"
import { successAlert,warningAlert } from "../../../utils/alert.js"
import { manageAdd,manageEdit } from "../../../utils/request.js"

  export default {
    props : ["info"],
    data() {
      return {
        form: {
          roleid: 0,
          username: "",
          password: "",
          status: 1
        }
      };
    },
    computed: {
      ...mapGetters({
        manageRoleList : "role/list"
      })
    },
    methods: {
      ...mapActions({
        manageReqChangeList : "role/reqChangeList",
        reqChangeList : "manage/reqChangeList",
        reqChangeTotal : "manage/reqChangeTotal"
      }),
      reset() {
        this.form = {
          roleid: 0,
          username: "",
          password: "",
          status: 1
        }
      },
      cancel() {
        this.info.isShow = false;
        this.reset()
      },
      add() {
        manageAdd(this.form).then( res => {
          if( res.data.code == 200 ) {
            successAlert(res.data.msg);
            this.cancel();
            this.reqChangeTotal();
            this.reqChangeList();
          }else {
            warningAlert(res.data.msg)
          }
        })
      },
      getOne(form) {
        this.form = form;
        this.form.password = "";
      },
      edit() {
        manageEdit(this.form).then( res => {
          if( res.data.code == 200 ) {
            successAlert(res.data.msg);
            this.cancel();
            this.reqChangeList()
          }else {
            warningAlert(res.data.msg);
          }
        })
      }
    },
    mounted() {
      this.manageReqChangeList();
    }
  };
</script>

<style>

</style>