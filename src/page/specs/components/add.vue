<template>
  <div>
    <el-dialog :visible.sync="info.isShow" width="50%" @close="cancel">

      <el-form ref="form" :model="form" label-width="80px">
        
        <el-form-item label="规格名称">
          <el-input v-model="form.specsname"></el-input>
        </el-form-item>
        
        <el-form-item label="规格属性" v-for="(item,index) in attrArr" :key="index">
          <div class="bigBox">
            <el-input v-model="attrArr[index]"></el-input>
            <el-button type="primary" class="smBox" v-if="index==0" @click="addAttr">新增规格属性</el-button> 
            <el-button type="danger" class="smBox" v-else @click="delAttr(index)">删除</el-button>
          </div>
        </el-form-item>
        
        <el-form-item label="状态">
          <el-switch v-model="form.status" :active-value="1" :inactive-value="2"></el-switch>
        </el-form-item>

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
import { specsAdd,specsInfo,specsEdit } from "../../../utils/request.js"

  export default {
    props : ["info"],
    data() {
      return {
        attrArr : [""],
        form: {
          specsname : "",
          status: 1
        }
      };
    },
    computed: {
      ...mapGetters({
        manageRoleList : "role/list"
      })
    },
    methods: {
      ...mapActions({
        manageReqChangeList : "role/reqChangeList",
        reqChangeList : "specs/reqChangeList",
        reqChangeTotal : "specs/reqChangeTotal"
      }),
      addAttr() {
        this.attrArr.push("");
      },
      delAttr(i) {
        this.attrArr.splice(i,1)
      },
      reset() {
        this.form = {
          specsname : "",
          status: 1
        };
        this.attrArr = [""]
      },
      cancel() {
        this.info.isShow = false;
        this.reset()
      },
      add() {
        this.form.attrs = JSON.stringify(this.attrArr)
        specsAdd(this.form).then( res => {
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
      getOne(id) {
        specsInfo(id).then( res => {
          if( res.data.code == 200 ){
            let attrs = res.data.list[0].attrs;
            let arrStr = "";
            for(let i=0;i<attrs.length;i++) {
              if( i==attrs.length-1 ) {
                arrStr += attrs[i]
              }else {
                arrStr += attrs[i] + ","
              }
            };
            let arr = JSON.parse(arrStr)

            this.form = res.data.list[0];
            this.attrArr = arr;
            this.form.id = res.data.list[0].id
            console.log(this.form);
          }else {
            warningAlert( res.data.msg )
          }
        })
      },
      edit() {
        this.form.attrs = JSON.stringify(this.attrArr)
        specsEdit(this.form).then( res => {
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
      this.manageReqChangeList();
    }
  };
</script>

<style>
  .bigBox {
    display: flex;
  }
  .smBox {
    flex: 1;
  }
</style>