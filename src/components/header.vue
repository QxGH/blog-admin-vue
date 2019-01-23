<template>
  <el-menu
    router
    :default-active="$route.path"
    class="el-menu"
    mode="horizontal"
    @select="handleSelect"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b">
    <el-menu-item index="/index">首页</el-menu-item>
    <el-menu-item index="/editor">编辑</el-menu-item>
    <el-menu-item index="/tag">标签</el-menu-item>
    <el-menu-item index="/type">分类</el-menu-item>
  </el-menu>
</template>

<script>
export default {
  name: 'Header',
  data () {
    return {
      // activeIndex: '/index'
    }
  },
  methods: {
    handleSelect(key, keyPath) {
      // console.log(key, keyPath);
    }
  }
}
</script>

<style scoped>
h1, h2 {
  	font-weight: normal;
}
</style>
