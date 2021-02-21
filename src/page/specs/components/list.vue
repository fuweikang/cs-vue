<template>
  <div>
     <el-table :data="list" border style="width: 100%">
        <el-table-column prop="id" label="规格编号"></el-table-column>
        <el-table-column prop="specsname" label="规格名称"></el-table-column>
        <el-table-column label="规格属性">
          <!-- <template slot-scope="scope">
            <div>
              <el-tag v-for="(item,index) in scope.row.attrs" :key="index">{{ item }}</el-tag>
            </div>
          </template> -->
          <!-- <el-tag v-for="(item,index) in attrArr" :key="index">{{ item }}</el-tag> -->
          <!-- <el-tag>{{attrArr}}</el-tag> -->
          <!-- <template v-for="(item,index) in attrArr" :key="index">

          </template> -->
          <template slot-scope="scope">
            <div>
              <el-tag v-for="(item,index) in scope.row.attrs" :key="index">{{ item }}</el-tag>
            </div>
          </template>
        </el-table-column>
        
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
import { manageInfo,specsDel,manageAll } from "../../../utils/request.js"
export default {
  data() {
    return {
      attrArr: ["12", "24", "48", "96"]
    }
  },
  components: {

  },
  computed: {
    ...mapGetters({
      list: "specs/list",
      total: "specs/total",
      size: "specs/size",
      page: "specs/page"
    })
  },
  methods: {
    ...mapActions({
      reqChangeList: "specs/reqChangeList",
      reqChangeTotal: "specs/reqChangeTotal",
      reqChangePage: "specs/reqChangePage"
    }),
    edit(id) {
      this.$emit("edit",id)
    },
    del(id) {
      specsDel(id).then( res => {
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
    // this.attrArr = JSON.parse(this.list.attrs)
    // this.list.attrs = JSON.parse(this.list.attrs)
    // for( let i=0; i<this.list.length; i++) {
      // this.attrArr[i] = JSON.parse( this.list[i].attrs )
    // }
    
  }
}
</script>

<style>

</style>