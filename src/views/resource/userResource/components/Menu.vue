<template>
  <Affix :offset="80" :z-index="99">
    <!-- <el-affix :offset="80" :z-index="99">-->
    <el-menu class="menu">
      <el-menu-item>我的资源</el-menu-item>
      <el-menu-item>我的收藏</el-menu-item>
      <el-menu-item>已下载</el-menu-item>
    </el-menu>
    <el-button type="primary">上传资源</el-button>
    <!-- </el-affix>-->
  </Affix>
</template>

<script setup>
import Affix from "@/components/Affix/index.vue";
</script>

<style scoped lang="scss">
.menu {
  padding: 10px 0;
  border: none;
  margin-bottom: 10px;

  :deep(.el-menu-item) {
    border-radius: 20px;
    justify-content: center;
    height: 32px;
  }

  :deep(.el-menu-item:hover) {
    font-weight: bold;
  }
}
</style>