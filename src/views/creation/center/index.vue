<template>
  <el-main>
    <div class="container">
      <Sidebar/>
      <div class="content">
        <RouterView></RouterView>
      </div>
    </div>
  </el-main>
  <el-backtop :right="10" :bottom="120"/>
</template>

<script setup>
import Sidebar from "@/views/creation/center/components/Sidebar.vue";
</script>

<style scoped lang="scss">
.el-main {
  overflow:visible;
  max-width: 1800px;
}

.container {
  display: flex;

  .content {
    width: 100%;
    margin-right: 50px;
  }
}
</style>