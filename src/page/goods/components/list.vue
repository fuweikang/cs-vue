<template>
  <div>
     <el-table :data="list" border style="width: 100%">
        <el-table-column prop="id" label="商品编号"></el-table-column>
        <el-table-column prop="goodsname" label="商品名称"></el-table-column>
        <el-table-column label="商品价格">
          <template slot-scope="scope">
            <div>
              {{scope.row.price | filterPrice}}
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="market_price" label="市场价格"></el-table-column>

        <el-table-column label="图片"> 
        <template slot-scope="scope">
          <div>
            <img :src="$imgUrl + scope.row.img" class="img">
          </div>
        </template>
      </el-table-column>

        <el-table-column label="是否新品">
          <template slot-scope="scope">
            <div>
              <el-button type="primary" v-if="scope.row.isnew == 1">是</el-button>
              <el-button type="info" v-else>否</el-button>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="是否热卖">
          <template slot-scope="scope">
            <div>
              <el-button type="primary" v-if="scope.row.ishot == 1">是</el-button>
              <el-button type="info" v-else>否</el-button>
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
        <el-table-column prop="date" label="操作">
          
          <template slot-scope="scope">
            <div>
              <el-button type="primary" @click="edit(scope.row.id)">编辑</el-button>
              <el-button type="danger" @click="del(scope.row.id)">删除</el-button>
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
import { goodsInfo,goodsDel,manageAll } from "../../../utils/request.js"
export default {
  components: {

  },
  computed: {
    ...mapGetters({
      list: "goods/list",
      total: "goods/total",
      size: "goods/size",
      page: "goods/page"
    })
  },
  methods: {
    ...mapActions({
      reqChangeList: "goods/reqChangeList",
      reqChangeTotal: "goods/reqChangeTotal",
      reqChangePage: "goods/reqChangePage"
    }),
    edit(id) {
      goodsInfo(id).then( res => {
        if( res.data.code == 200 ) {
          this.$emit("edit",res.data.list,id)
        }else {
          warningAlert(res.data.msg)
        }
      })
    },
    del(id) {
      goodsDel(id).then( res => {
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

<style scoped>
  .img {
    display: block;
    width: 100px;
    height: 100px;
  }
</style>