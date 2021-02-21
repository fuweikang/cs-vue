<template>
  <div>
     <el-table :data="list" border style="width: 100%">
        <el-table-column prop="id" label="用户编号"></el-table-column>
        <el-table-column prop="username" label="用户名"></el-table-column>
        <el-table-column prop="rolename" label="所属角色"></el-table-column>
        <el-table-column prop="status" label="状态">
          <template slot-scope="scope">
            <div>
              <el-button type="primary" v-if="scope.row.status == 1">启用</el-button>
              <el-button type="info" v-else>禁用</el-button>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="date" label="操作">
          
          <template slot-scope="scope">
            <div>
              <el-button type="primary" @click="edit(scope.row.uid)">编辑</el-button>
              <el-button type="danger" @click="del(scope.row.uid)">删除</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination
        background
        layout="prev, pager, next"
        :page-size="size"
        :total="total"
        @current-change="changePage">
      </el-pagination>
  </div>
</template>

<script>
import { mapGetters,mapActions } from "vuex"
import { successAlert,warningAlert } from "../../../utils/alert.js"
import { manageInfo,manageDel,manageAll } from "../../../utils/request.js"
export default {
  components: {

  },
  computed: {
    ...mapGetters({
      list: "manage/list",
      total: "manage/total",
      size: "manage/size",
      page: "manage/page"
    })
  },
  methods: {
    ...mapActions({
      reqChangeList: "manage/reqChangeList",
      reqChangeTotal: "manage/reqChangeTotal",
      reqChangePage: "manage/reqChangePage"
    }),
    edit(id) {
      manageInfo(id).then( res => {
        if( res.data.code == 200 ) {
          this.$emit("edit",res.data.list)
        }else {
          warningAlert(res.data.msg)
        }
      })
    },
    del(id) {
      manageDel(id).then( res => {
        if( res.data.code == 200 ){
          successAlert(res.data.msg);
          this.reqChangeTotal()
          this.reqChangeList()
          
        }else {
          warningAlert(res.data.msg)
        }
      })
    },
    changePage(n) {
      this.reqChangePage(n)
      this.reqChangeList()
    }
  },
  mounted() {
    this.reqChangeList()
    this.reqChangeTotal()
  }
}
</script>

<style>

</style>