<template>
  <div>
    <el-dialog :visible.sync="info.isShow" width="30%" @close="cancel">

      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="角色名称">
          <el-input v-model="form.rolename"></el-input>
        </el-form-item>

        <el-form-item label="角色权限">
          <el-tree
            :data="menuList"
            ref = "tree"
            show-checkbox
            node-key="id"
            :props="{children: 'children',label: 'title'}">
          </el-tree>
        </el-form-item>

        <el-form-item label="状态">
          <el-switch v-model="form.status" :active-value="1" :inactive-value="2"></el-switch>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="add" v-if="info.isAdd">添 加</el-button>
        <el-button type="primary" @click="edit" v-else>编 辑</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters,mapActions } from "vuex"
import { successAlert,warningAlert } from "../../../utils/alert.js"
import { roleAdd,roleInfo,roleEdit } from "../../../utils/request.js"

  export default {
    props: ["info"],
    data() {
      return {
        form: {
          rolename: "",
          menus: "",
          status: 1
        }
      };
    },
    computed: {
      ...mapGetters({
        menuList: "menu/list"
      })
    },
    methods: {
      reset() {
        this.form = {
          rolename: "",
          menus: "",
          status: 1
        }
      },
      cancel() {
        this.info.isShow = false;
        this.reset();
        this.$refs.tree.setCheckedKeys([]);
      },
      add() {
        this.form.menus = JSON.stringify( this.$refs.tree.getCheckedKeys() )
        roleAdd( this.form ).then( res => {
          if( res.data.code == 200 ) {
            successAlert( res.data.msg );
            this.cancel();
            this.roleReqChangeList();
          }else {
            warningAlert( res.data.msg )
          }
        })
      },
      edit() {
        this.form.menus = JSON.stringify(this.$refs.tree.getCheckedKeys());
        roleEdit(this.form).then( res => {
          if( res.data.code == 200 ) {
            successAlert( res.data.msg );
            this.cancel();
            this.roleReqChangeList;
          }else {
            warningAlert( res.data.msg )
          }
        })
      },
      getOne(id) {
        roleInfo(id).then( res => {
          if( res.data.code == 200 ) {
            this.form = res.data.list;
            this.form.menus = JSON.parse(res.data.list.menus);
            this.form.id = id;
            this.$refs.tree.setCheckedKeys(this.form.menus)
          }else {
            warningAlert( res.data.msg )
          }
        })
      },
      ...mapActions({
        menuReqChangeList: "menu/reqChangeList",
        roleReqChangeList: "role/reqChangeList"
      }),
    },
    mounted() {
      this.menuReqChangeList()
    }
  };
</script>

<style>

</style>