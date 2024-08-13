<template>
  <Affix :offset="fixHeight" :z-index="99">
    <!-- <el-affix :offset="fixHeight" :z-index="99">-->
    <div class="right-card-box" ref="rightCardRef">
      <el-card class="side-card">

      </el-card>
    </div>
    <!-- </el-affix>-->
  </Affix>
</template>

<script setup>
import Affix from "@/components/Affix/index.vue";
import {useRouter} from "vue-router";
import {onMounted, ref} from "vue";

const router = useRouter()
const rightCardRef = ref()
const fixHeight = ref()

onMounted(() => {
  // 监听滚动改变右边栏的固定位置
  window.addEventListener("scroll", () => {
    let rightCardHeight
    if (rightCardRef.value)
      rightCardHeight = rightCardRef.value.offsetHeight + 20
    let windowHeight = window.innerHeight
    if (rightCardHeight >= windowHeight - 80)
      fixHeight.value = -(rightCardHeight - windowHeight)
    else
      fixHeight.value = 80
  })
})
</script>

<style scoped lang="scss">
.el-card {
  border: none;
  box-shadow: none;
}

.side-card {
  margin-bottom: 10px;
}

</style>