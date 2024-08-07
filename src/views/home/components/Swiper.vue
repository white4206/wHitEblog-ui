<template>
  <el-carousel indicator-position="outside" height="450px">
    <el-carousel-item v-for="item in carouselItems" :key="item.id">
      <img :src="item.image" :alt="item.title" class="img">
    </el-carousel-item>
  </el-carousel>
</template>

<script setup>
import {onMounted, ref} from 'vue'
import {getCarousel} from "@/api/common.js";

const carouselItems = ref([]);

onMounted(() => {
  getCarousel().then(res => {
    carouselItems.value = res.data.map(item => {
      return {
        ...item,
        image: import.meta.env.VITE_APP_BASE_ADMIN_API + item.image
      }
    })
  })
})
</script>

<style lang="scss" scoped>
.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}

.el-carousel__item {
  text-align: center;
}

.img {
  height: 100%;
  width: 100%;
}
</style>
  