<template>
  <div>
    <el-button type="primary" @click="add">添加</el-button>
    <v-add :info="info" ref="addRef"></v-add>
    <v-list @edit="edit"></v-list>
  </div>
</template>

<script>
import vAdd from "./components/add"
import vList from "./components/list"

export default {
  data() {
    return {
      info: {
        isShow: false,
        isAdd: true
      }
    }
  },
  methods: {
    add() {
      this.info.isShow = true
      this.info.isAdd = true
    },
    edit(id) {
      this.info.isShow = true;
      this.info.isAdd = false;
      this.$refs.addRef.getOne(id);
    }
  },
  components: {
    vAdd,
    vList
  }
}
</script>

<style>
</style>