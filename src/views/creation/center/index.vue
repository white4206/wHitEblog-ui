<template>
  <el-container>
    <el-aside>
      <Sidebar/>
    </el-aside>
    <el-main>
      <RouterView></RouterView>
    </el-main>
  </el-container>
  <el-backtop :right="10" :bottom="120"/>
</template>

<script setup>
import Sidebar from "@/views/creation/center/components/Sidebar.vue";
</script>

<style scoped lang="scss">
.el-container {
  display: flex;

  .el-aside {
    width: 256px;
  }

  .el-main {
    margin: 0 auto;
    overflow: visible;
    max-width: 1500px;
    min-width: 1000px;
  }
}

</style>