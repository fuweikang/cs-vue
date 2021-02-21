<template>
  <div>
    <div>
      <el-button type=primary @click="register">注册</el-button>
      <v-add :info="obj" ref="addRef"></v-add>
      <v-list @edit="edit"></v-list>
    </div>
  </div>
</template>

<script>
import vAdd from "./components/add.vue"
import vList from "./components/list.vue"

export default {
  data() {
    return {
      obj: {
        isShow: false,
        isAdd: true
      }
    }
  },
  components: {
    vAdd,vList
  },
  methods: {
    register() {
      this.obj.isShow = true;
      this.obj.isAdd = true;
    },
    edit(uid) {
      this.obj.isShow = true;
      this.obj.isAdd = false;
      this.$refs.addRef.getOne(uid);
    }
  }
}
</script>

<style>

</style>