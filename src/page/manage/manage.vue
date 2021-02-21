<template>
  <div>
    <el-button type="primary" @click="add">添加</el-button>
    <v-add :info="info" ref="addRef"></v-add>
    <v-list @edit="edit"></v-list>
  </div>
</template>

<script>
import vAdd from "./components/add.vue"
import vList from "./components/list.vue"

export default {
  data() {
    return {
      info: {
        isShow : false,
        isArr : true
      }
    }
  },
  components: {
    vAdd,
    vList
  },
  methods: {
    add() {
      this.info.isShow = true;
      this.info.isArr = true;
    },
    edit(form) {
      this.info.isShow = true;
      this.info.isArr = false;
      this.$refs.addRef.getOne(form);
    }
  }
}
</script>

<style>

</style>