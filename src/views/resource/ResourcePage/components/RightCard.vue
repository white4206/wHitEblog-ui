<template>
  <Affix :offset="fixHeight" :z-index="99">
    <!-- <el-affix :offset="fixHeight" :z-index="99">-->
    <div class="right-card-box" ref="rightCardRef">
      <el-card class="hot-download-card side-card" shadow="never">
        <template #header>
          <div class="card-header">
            <span>下载资源热榜</span>
            <el-tag type="info" size="small" effect="plain">下载资源</el-tag>
          </div>
        </template>
        <div class="hot-download-box">
          <div class="hot-download-item" v-for="(item,index) in 10" :key="item.id">
                        <span v-if="index<3" class="num"><img
                            :src="rankSrc(index)"
                            alt=""></span>

            <div v-else class="num">{{ item }}</div>
            <el-link :underline="false" type="info">
                          <span class="title">
                            标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题
                          </span>
            </el-link>
          </div>
        </div>
      </el-card>
    </div>
    <!-- </el-affix>-->
  </Affix>
</template>

<script setup>
import Affix from "@/components/Affix/index.vue";
import {onMounted, ref} from "vue";

const rightCardRef = ref()
const fixHeight = ref()

const rankSrc = (index) => {
  if (index === 0)
    return new URL('@/assets/images/common/num_1.png', import.meta.url).href
  else if (index === 1)
    return new URL('@/assets/images/common/num_2.png', import.meta.url).href
  else
    return new URL('@/assets/images/common/num_3.png', import.meta.url).href
}
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
.side-card {
  margin-bottom: 20px;

  .card-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 18px;
  }
}

.hot-download-card {
  :deep(.el-card__body) {
    padding: 0 20px 20px 20px;
  }

  .hot-download-box {
    .hot-download-item {
      display: flex;
      justify-content: space-between;
      margin-top: 20px;

      .num {
        flex-shrink: 0;
        text-align: center;
        height: 20px;
        width: 20px;
        font-weight: bold;
        font-size: 14px;
        color: var(--el-text-color-secondary);
        margin-right: 10px;

        img {
          height: 20px;
          width: 20px;
        }
      }

      .title {
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
        text-overflow: ellipsis;
        overflow: hidden;
        font-size: 16px;
        color: var(--el-text-color-primary)
      }

      .title:hover {
        color: var(--el-text-color-secondary)
      }
    }
  }
}
</style>