<template>
  <div v-loading.fullscreen.lock="globalStore.pageLoading">
    <!--      <el-header class="menu" v-if="route.fullPath!=='/login'">-->
    <Affix :offset="0" :z-index="999">
      <el-header :style="{position: route.path==='/video'?'absolute':''}" class="header">
        <Navbar></Navbar>
      </el-header>
    </Affix>
    <router-view></router-view>
  </div>
</template>

<script setup>
import Navbar from '@/components/Navbar/index.vue'
import useGlobalStore from '@/store/modules/global.js'
import {useRoute} from "vue-router";
import Affix from "@/components/Affix/index.vue";

const globalStore = useGlobalStore()
const route = useRoute()
</script>

<style lang="scss" scoped>
.header {
  padding: 0;
  width: 100%;
  height: 100%;
}
</style>
