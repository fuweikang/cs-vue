<template>
  <div>
    <el-dialog
      :visible.sync="obj.isShow"
      width="60%"
      :before-close="cancel">
      
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="活动名称">
          <el-input v-model="form.title"></el-input>
        </el-form-item>

        <el-form-item label="活动期限" v-if="obj.isShow">
          <div class="block">
            <el-date-picker
              v-model="value1"
              type="datetimerange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker>
          </div>
        </el-form-item>

      

        <el-form-item label="一级分类">
          <el-select v-model="form.first_cateid" @change="change1">
            <el-option :value="0" label="请选择分类" disabled></el-option>
            <el-option v-for="item in cateList" :key="item.id" :label="item.catename" :value="item.id"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="二级分类">
          <el-select v-model="form.second_cateid" @change="change2">
            <el-option :value="0" label="请选择分类" disabled></el-option>
            <div v-for="item in cateList" :key="item.id">
              <div v-if="item.id == form.first_cateid">
                <el-option v-for="item1 in item.children" :key="item1.id" :label="item1.catename" :value="item1.id"></el-option>
              </div>
            </div>
          </el-select>
        </el-form-item>

        <el-form-item label="商品">
          <el-select v-model="form.goodsid" @change="change3">
            <el-option :value="0" label="请选择商品" disabled></el-option>
            <div v-for="item2 in goodsList" :key="item2.id">
              <div v-if="item2.first_cateid == form.first_cateid && item2.second_cateid == form.second_cateid">
                <el-option :label="item2.goodsname" :value="item2.id"></el-option>
              </div>
            </div>
          </el-select>
        </el-form-item>

        <el-form-item label="状态">
          <el-switch v-model="form.status" :active-value="1" :inactive-value="0"></el-switch>
        </el-form-item>
      </el-form>



      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="add" v-if="obj.isAdd">添 加</el-button>
        <el-button type="primary" @click="edit" v-else>编 辑</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {mapActions,mapGetters} from "vuex"
import {successAlert,warningAlert} from "../../../utils/alert.js"
import {seckAdd,seckEdit} from "../../../utils/request.js"

export default {
  props:["info"],
  components: {
    
  },
  data(){
    return {
      value1: [],
      obj: {
        isShow: false,
        isAdd: true
      },
      form: {
        title: "",
        begintime: 0,
        endtime: 0,
        first_cateid: 0,
        second_cateid: 0,
        goodsid: 0,
        status: 1
      }
    }
  },
  computed:{
    ...mapGetters({
      cateList:"cate/list",
      goodsList:"goods/list1"
    })
  },
  methods:{
    ...mapActions({
      changeCateList:"cate/reqChangeList",
      changeGoodsList:"goods/reqChangeList1",
      reqChangeList:"seckill/reqChangeList"
    }),
    cancel(){
      this.obj.isShow = false;
      this.form = {
        title: "",
        begintime: 0,
        endtime: 0,
        first_cateid: 0,
        second_cateid: 0,
        goodsid: 0,
        status: 1
      };
      this.value1 = [];
    },
    add(){
      seckAdd(this.form).then(res => {
        if(res.data.code == 200) {
          successAlert(res.data.msg)
          this.reqChangeList()
          this.cancel()
        }else {
          warningAlert(res.data.msg)
        }
      });
      this.cancel();
    },
    change1(){
      this.form.second_cateid = 0;
      this.form.goodsid = 0;
    },
    change2(){
      this.form.goodsid = 0;
    },
    change3(){

    },
    getOne(form,id){
      this.value1[0] = new Date(Number(form.begintime));
      this.value1[1] = new Date(Number(form.endtime));
      this.form = form;
      this.form.id = id;
      console.log(this.value1);
      console.log(this.form);
    },
    edit(){
      seckEdit(this.form).then(res => {
        if(res.data.code == 200) {
          successAlert(res.data.msg);
          this.reqChangeList();
          this.cancel();
        }else {
          warningAlert(res.data.msg)
        }
      })
    }
  },
  mounted(){
    this.obj = this.info;
  },
  updated(){
    for(var i=0; i<this.value1.length; i++) {
      if(i==0){
        this.form.begintime = this.value1[i].getTime()
      }
      if(i==1){
        this.form.endtime = this.value1[i].getTime()
      }
    }
  }
}
</script>

<style>

</style>