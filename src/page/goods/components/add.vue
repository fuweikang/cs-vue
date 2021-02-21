<template>
  <div>
    <el-dialog :visible.sync="info.isShow" width="50%" @close="cancel" @opened="opened">

      <el-form ref="form" :model="form" label-width="80px">

        <el-form-item label="一级分类" >
          <el-select v-model="form.first_cateid" @change="change1">
            <el-option :value="0" label="请选择" disabled></el-option>
            <el-option v-for="item in cateList" :key="item.id" :label="item.catename" :value="item.id" ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="二级分类">
          <el-select v-model="form.second_cateid">
            <el-option :value="0" label="请选择" disabled></el-option>
            <template v-for="item in cateList">
              <template v-if="item.id == form.first_cateid">
                <el-option v-for="item1 in item.children" :key="item1.id" :label="item1.catename" :value="item1.id" ></el-option>
              </template>
            </template>
          </el-select>
        </el-form-item>

        <el-form-item label="商品名称">
          <el-input v-model="form.goodsname"></el-input>
        </el-form-item>
        <el-form-item label="价格">
          <el-input v-model="form.price"></el-input>
        </el-form-item>
        <el-form-item label="市场价格">
          <el-input v-model="form.market_price"></el-input>
        </el-form-item>

        <el-form-item label="图片">
          <div class="imgBox">
            <input type="file" @change="changeInp" v-if="info.isShow">
            <div class="add">+</div>
            <img :src="imgUrl1">
          </div>
        </el-form-item>

        <el-form-item label="商品规格">
          <el-select v-model="form.specsid" @change="change2">
            <el-option :value="0" label="请选择" disabled></el-option>
            <el-option v-for="item in specsList" :key="item.id" :label="item.specsname" :value="item.id" ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="规格属性">
          <el-select v-model="form.specsattr" multiple>
            <el-option :value="0" label="请选择" disabled></el-option>
            <!-- <el-option v-for="item in specsList" :key="item.id" :label="item.attrs" :value="item.attrs" ></el-option> -->
            <template v-for="item in specsList" > 
              <template v-if="form.specsid == item.id">
                <el-option v-for="(item1,index) in item.attrs" :key="index" :label="item1" :value="item1"></el-option>
              </template>
            </template>
          </el-select>
        </el-form-item>

        <el-form-item label="是否新品">
          <el-radio-group v-model="form.isnew">
            <el-radio :label="1">是</el-radio>
            <el-radio :label="2">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="是否热卖">
          <el-radio-group v-model="form.ishot">
            <el-radio :label="1">是</el-radio>
            <el-radio :label="2">否</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="状态">
          <el-switch v-model="form.status" :active-value="1" :inactive-value="2"></el-switch>
        </el-form-item>

        <div id="div1" v-if="info.isShow"></div>

      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="add" v-if="info.isArr">添 加</el-button>
        <el-button type="primary" @click="edit" v-else>编 辑</el-button>
      </span>

    </el-dialog>
  </div>
</template>

<script>
import { mapGetters,mapActions } from "vuex"
import { successAlert,warningAlert } from "../../../utils/alert.js"
import { goodsAdd,goodsEdit } from "../../../utils/request.js"

import E from 'wangeditor'

  export default {
    props : ["info"],
    data() {
      return {
        imgUrl1: "",
        form: {
          first_cateid: 0,
          second_cateid: 0,
          goodsname: "",
          price: "",
          market_price: "",
          img: "",
          description: "",
          specsid: 0,
          specsattr: [],
          isnew: 1,
          ishot: 1,
          status: 1
        }
      };
    },
    computed: {
      ...mapGetters({
        cateList : "cate/list",
        specsList : "specs/list",
        manageRoleList : "role/list"
      })
    },
    methods: {
      ...mapActions({
        reqCateList : "cate/reqChangeList",
        reqSpecsList : "specs/reqChangeList",
        reqChangeList : "goods/reqChangeList",
        reqChangeTotal : "goods/reqChangeTotal"
      }),
      change1() {
        this.form.second_cateid = 0;
      },
      change2() {
        this.form.specsattr = 0;
      },
      changeInp(e) {
        let files = e.target.files[0];
        if( files ) {
          this.imgUrl1 = URL.createObjectURL(files);
        }
        this.form.img = files;
      },
      opened() {
        this.editor = new E('#div1')
        this.editor.create()
        this.editor.txt.html(this.form.description)
      },
      reset() {
        this.form = {
          first_cateid: 0,
          second_cateid: 0,
          goodsname: "",
          price: "",
          market_price: "",
          img: "",
          description: "",
          specsid: 0,
          specsattr: [],
          isnew: 1,
          ishot: 1,
          status: 1
        }
      },
      cancel() {
        this.info.isShow = false;
        this.reset()
        this.reqCateList();
        this.reqSpecsList();
      },
      add() {
        this.form.description = this.editor.txt.html();
        this.form.specsattr = JSON.stringify( this.form.specsattr )
        goodsAdd(this.form).then( res => {
          if( res.data.code == 200 ) {
            successAlert(res.data.msg);
            this.cancel();
            this.reqChangeTotal();
            this.reqChangeList();
          }else {
            warningAlert(res.data.msg)
          }
        })
      },
      getOne(form,id) {
        form.specsattr = JSON.parse(form.specsattr)
        this.form = form;
        this.form.id = id;
        this.imgUrl1 = this.$imgUrl + this.form.img;
      },
      edit() {
        this.form.description = this.editor.txt.html();
        this.form.specsattr = JSON.stringify( this.form.specsattr )
        console.log(this.form);
        goodsEdit(this.form).then( res => {
          if( res.data.code == 200 ) {
            successAlert(res.data.msg);
            this.cancel();
            this.reqChangeList()
          }else {
            warningAlert(res.data.msg);
          }
        })
      }
    },
    mounted() {
      this.reqCateList();
      this.reqSpecsList();
    }
  };
</script>

<style scoped>
  .imgBox {
    position: relative;
    width: 200px;
    height: 200px;
    overflow: hidden;
    border: 1px dashed #333;
    border-radius: 4px;
  }
  .imgBox input {
    position: absolute;
    top: 0;
    left: 0;
    width: 200px;
    height: 200px;
    opacity: 0;
    z-index: 2;
  }
  .imgBox .add {
    position: absolute;
    top: 0;
    left: 0;
    width: 200px;
    height: 200px;
    font-size: 60px;
    line-height: 200px;
    text-align: center;
  }
  .imgBox img {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
  }
</style>