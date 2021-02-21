<template>
  <div>
    <el-table e
      :data="list"
      border
      stripe
      style="width: 100%">
      <el-table-column
        prop="id"
        label="用户编号"
        width="100">
      </el-table-column>
      <el-table-column
        prop="nickname"
        label="昵称">
      </el-table-column>
      <el-table-column
        prop="phone"
        label="手机号">
      </el-table-column>
      <el-table-column label="状态">
        <template slot-scope="scope">
          <div>
            <el-button type="primary" v-if="scope.row.status == 1">启用</el-button>
            <el-button type="info" v-else>禁用</el-button>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <div>
            <el-button type="primary" @click="edit(scope.row.uid)">编辑</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { mapGetters,mapActions } from "vuex"

export default {
  data() {
    return {
      
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
    edit(uid) {
      this.$emit("edit",uid)
    }
  },
  mounted() {
    this.reqChangeList();
  }
}
</script>

<style>

</style>