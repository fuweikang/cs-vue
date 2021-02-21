<template>
  <div>
    <template>
      <el-table
        :data="seckList"
        border
        style="width: 100%">
        <el-table-column
          prop="title"
          label="活动名称"
          width="180">
        </el-table-column>
        <el-table-column
          label="状态"
          width="180">
          <template slot-scope="scope">
            <div>
              <el-button type="success" v-if="scope.row.status == 1">启用</el-button>
              <el-button type="info" v-if="scope.row.status == 0">禁用</el-button>
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
    </template>
  </div>
</template>

<script>
import {mapActions,mapGetters} from "vuex"
import { successAlert, warningAlert } from '../../../utils/alert.js'
import {seckList,seckInfo,seckDelete} from "../../../utils/request.js"
export default {
  data(){
    return {
      
    }
  },
  components: {
    
  },
  computed:{
    ...mapGetters({
      cateList: "cate/list",
      goodsList: "goods/list1",
      seckList: "seckill/list"
    })
  },
  methods:{
    ...mapActions({
      changeCateList: "cate/reqChangeList",
      changeGoodsList: "goods/reqChangeList1",
      changeSeckList: "seckill/reqChangeList"
    }),
    edit(id) {
      seckInfo(id).then( res => {
        if(res.data.code == 200) {
          this.$emit("edit",res.data.list,id)
        }else {
          warningAlert(res.data.msg)
        }
      })
    },
    del(id) {
      seckDelete(id).then(res => {
        if(res.data.code == 200) {
          successAlert(res.data.msg);
          this.changeSeckList();
        }else{
          warningAlert(res.data.msg);
        }
      })
    }
  },
  mounted(){
    this.changeCateList();
    this.changeGoodsList();
    this.changeSeckList();
  }
}
</script>

<style>

</style>