<template>
  <div>
    <el-table
      :data="list"
      style="width: 100%"
      row-key="id"
      border
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
    >
      <el-table-column prop="id" label="分类编号"> </el-table-column>

      <el-table-column prop="catename" label="分类名称"> </el-table-column>



      <el-table-column label="图片"> 
        <template slot-scope="scope">
          <div>
            <img :src="$imgUrl + scope.row.img">
          </div>
        </template>
      </el-table-column>

      <el-table-column prop="status" label="状态">
        <template slot-scope="scope">
          <div>
            <el-button type="primary" v-if="scope.row.status == 1">启 用</el-button>
            <el-button type="info" v-else>禁 用</el-button>
          </div>
        </template>
      </el-table-column>

      <el-table-column prop="" label="操作">
        <template slot-scope="scope">
          <div>
            <el-button type="primary" @click="edit(scope.row.id)">编 辑</el-button>
            <el-button type="danger" @click="del(scope.row.id)">删 除</el-button>
          </div>
        </template>
      </el-table-column>

    </el-table>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { successAlert,warningAlert } from "../../../utils/alert.js"
import { cateDel } from "../../../utils/request.js"

export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      list: "cate/list",
    }),
  },
  methods: {
    ...mapActions({
      reqChangeList: "cate/reqChangeList",
    }),
    del(id) {
      cateDel(id).then( res => {
        if( res.data.code == 200 ) {
          successAlert( res.data.msg )
          this.reqChangeList()
        }else {
          warningAlert( res.data.msg )
        }
      })
    },
    edit(id) {
      this.$emit("edit",id)
    }
  },
  mounted() {
    this.reqChangeList();
    console.log(this.list);
  },
};
</script>

<style>
</style>