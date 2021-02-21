<template>
  <div>
    <el-button type="primary" @click="add">添加</el-button>
    <v-add :info="obj" ref="addRef"></v-add>
    <v-list @edit="edit"></v-list>
  </div>
</template>

<script>
import vAdd from "./components/add.vue"
import vList from "./components/list.vue"
export default {
  data(){
    return {
      obj:{
        isShow: false,
        isAdd: true
      }
    }
  },
  components:{
    vAdd,vList
  },
  methods: {
    add(){
      this.obj.isShow = true;
      this.obj.isAdd = true;
    },
    edit(form,id) {
      this.obj.isShow = true;
      this.obj.isAdd = false;
      this.$refs.addRef.getOne(form,id);
    }
  }
}
</script>

<style>

</style>