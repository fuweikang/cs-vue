<template>
  <div>
    <el-table e
      :data="list"
      border
      stripe
      style="width: 100%">
      <el-table-column
        prop="id"
        label="编号"
        width="100">
      </el-table-column>
      <el-table-column
        prop="title"
        label="轮播图标题">
      </el-table-column>
      <el-table-column label="图片">
        <template slot-scope="scope">
          <div>
            <img :src="$imgUrl + scope.row.img" class="img">
          </div>
        </template>
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
            <el-button type="primary" @click="edit(scope.row.id)">编辑</el-button>
            <el-button type="danger" @click="del(scope.row.id)">删除</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import {bannerDelete} from "../../../utils/request.js"
import { mapGetters,mapActions } from "vuex"
import { successAlert, warningAlert } from '../../../utils/alert.js'

export default {
  data() {
    return {
      
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
    edit(id) {
      this.$emit("edit",id)
    },
    del(id) {
      bannerDelete(id).then(res => {
        if(res.data.code == 200) {
          successAlert(res.data.msg)
          this.reqChangeList();
        }else {
          warningAlert(res.data.msg)
        }
      })
    }
  },
  mounted() {
    this.reqChangeList();
    console.log(this.list);
  }
}
</script>

<style scoped>
  .img {
    display: block;
    width: 100px;
    height: 100px;
  }
</style>