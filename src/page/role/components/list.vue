<template>
  <div>
    <el-table :data="list" border style="width: 100%">
      <el-table-column
        prop="id"
        label="角色编号">
      </el-table-column>
      <el-table-column
        prop="rolename"
        label="角色名称">
      </el-table-column>
      <el-table-column
        prop="status"
        label="状态">
        <template slot-scope="scope">
          <div>
            <el-button type="primary" v-if="scope.row.status == 1">启用</el-button>
            <el-button type="info" v-else>禁用</el-button>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        label="操作">
        <template slot-scope="scope">
          <div>
            <el-button type="primary" @click="edit(scope.row.id)">编辑</el-button>
            <el-button type="danger" @click="del(scope.row.id)">删除</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { mapGetters,mapActions } from "vuex"
import { successAlert,warningAlert } from "../../../utils/alert.js"
import { roleDel } from "../../../utils/request.js"

export default {
  data() {
    return {

    }
  },
  computed: {
    ...mapGetters({
      list : "role/list"
    })
  },
  methods: {
    ...mapActions({
      reqChangeList : "role/reqChangeList"
    }),
    edit(id) {
      this.$emit("edit",id)
    },
    del(id) {
      roleDel(id).then( res => {
        successAlert(res.data.msg)
        this.reqChangeList()
      })
    }
  },
  mounted() {
    this.reqChangeList()
  }
}
</script>

<style>

</style>